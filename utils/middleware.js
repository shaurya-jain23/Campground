const {campgroundSchema, reviewSchema} = require('./schemas');
const ExpressError = require('./ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) =>{
    if(req.session.returnTo){
        res.locals.returnTo  = req.session.returnTo;
    }
    next();
}

//Campground middlewares 

module.exports.isAuthor = async(req, res, next) => {
    const {id} = req.params;
    const camp = await Campground.findById(id);
    if(!camp.author.equals(req.user._id)){
        req.flash('error', "You are not authorised to do that!!")
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateCampground = (req, res, next) =>{
    const result = campgroundSchema.validate(req.body);
    if(result.error){
        const msg = result.error.details.map(e => e.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

// reviews middlewares


module.exports.validateReview = (req,res,next)=>{
    const result = reviewSchema.validate(req.body);
    if(result.error){
        const msg = result.error.details.map(e => e.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}
module.exports.isReviewAuthor = async(req, res, next) => {
    const {id, reviewid} = req.params;
    const review = await Review.findById(reviewid);
    if(!review.author.equals(req.user._id)){
        req.flash('error', "You are not authorised to do that!!")
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}