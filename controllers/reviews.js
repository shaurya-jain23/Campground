const  Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.createReview = async (req, res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    console.log(review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!!!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async(req,res)=>{
    const {id, reviewid} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewid}})
    const review = await Review.findByIdAndDelete(reviewid); //Important
    req.flash('success', 'Review Deleted Successfully!!!');
    res.redirect(`/campgrounds/${id}`);
}