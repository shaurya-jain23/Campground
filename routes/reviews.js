const express = require('express');
const router = express.Router({mergeParams: true}); 
const catchAsync = require('../utils/catchAsync');
const  Review = require('../models/review');
const Campground = require('../models/campground');
const {isLoggedIn, validateReview, isReviewAuthor} = require('../utils/middleware.js');


router.post("/", isLoggedIn ,validateReview ,catchAsync(async (req, res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    console.log(review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!!!');
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewid', isLoggedIn, isReviewAuthor ,catchAsync(async(req,res)=>{
    const {id, reviewid} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewid}})
    const review = await Review.findByIdAndDelete(reviewid); //Important
    req.flash('success', 'Review Deleted Successfully!!!');
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;