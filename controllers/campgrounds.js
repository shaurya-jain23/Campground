const Campground = require('../models/campground');


module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds, title: 'All Campgrounds'});
}

module.exports.createCampground =  async (req, res, next) =>{
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map(file => ({url: file.path, filename: file.filename}));
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Campground Created Successfully');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.renderNewForm = async (req, res) =>{
    res.render('campgrounds/new');
}

module.exports.showCampground = async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return  res.redirect('/campgrounds');
    }
    const reviews = campground.reviews;
    res.render('campgrounds/show', {campground, reviews}); 
}

module.exports.editCampground = async (req, res) =>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground, {runValidators: true, new: true});
    const imgs = req.files.map(file => ({url: file.path, filename: file.filename}));
    campground.images.push(...imgs);
    await campground.save();
    req.flash('success', 'Campground Updated Successfully');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.renderEditForm = async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return  res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {campground});
}

module.exports.deleteCampground = async(req, res)=>{
    const {id} = req.params;
    const deletedCampgrounds= await Campground.findByIdAndDelete(id);
    console.log(deletedCampgrounds);
    res.redirect('/campgrounds');
}