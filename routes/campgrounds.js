const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgroundController = require('../controllers/campground.js')
const {isLoggedIn, isAuthor, validateCampground} = require('../utils/middleware.js');



router.get('/' ,catchAsync(campgroundController.index))

router.get('/new' , isLoggedIn , catchAsync(campgroundController.renderNewForm))

router.post('/' , isLoggedIn ,validateCampground ,catchAsync(campgroundController.createCampground))

router.get('/:id' ,catchAsync(campgroundController.showCampground))

router.put('/:id', isLoggedIn, isAuthor ,validateCampground ,catchAsync(campgroundController.editCampground))

router.get('/:id/edit', isLoggedIn, isAuthor ,catchAsync(campgroundController.renderEditForm))

router.delete("/:id", isLoggedIn, isAuthor ,catchAsync(campgroundController.deleteCampground) )

module.exports = router;