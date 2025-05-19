const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const {campgroundSchema} = require('../utils/schemas.js');

const validateCampground = (req, res, next) =>{
    const result = campgroundSchema.validate(req.body);
    if(result.error){
        const msg = result.error.details.map(e => e.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}


router.get('/' ,async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds, title: 'All Campgrounds'});
})

router.get('/new' ,async (req, res) =>{
    res.render('campgrounds/new');
})
router.post('/' , validateCampground ,catchAsync( async (req, res, next) =>{
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Campground Created Successfully');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.get('/:id' , catchAsync( async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return  res.redirect('/campgrounds');
    }
    const reviews = campground.reviews;
    res.render('campgrounds/show', {campground, reviews});
}))

router.put('/:id' , validateCampground ,catchAsync(async (req, res) =>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground, {runValidators: true, new: true});
    req.flash('success', 'Campground Updated Successfully');
    res.redirect(`/campgrounds/${campground._id}`);
}) )

router.get('/:id/edit' , catchAsync(async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', {campground});
}))

router.delete("/:id", catchAsync(async(req, res)=>{
    const {id} = req.params;
    const deletedCampgrounds= await Campground.findByIdAndDelete(id);
    console.log(deletedCampgrounds);
    res.redirect('/campgrounds');
}) )

module.exports = router;