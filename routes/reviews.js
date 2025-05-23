const express = require('express');
const router = express.Router({mergeParams: true}); 
const catchAsync = require('../utils/catchAsync');
const reviewController = require("../controllers/reviews.js")
const {isLoggedIn, validateReview, isReviewAuthor} = require('../utils/middleware.js');


router.post("/", isLoggedIn ,validateReview ,catchAsync(reviewController.createReview))

router.delete('/:reviewid', isLoggedIn, isReviewAuthor ,catchAsync(reviewController.deleteReview))

module.exports = router;