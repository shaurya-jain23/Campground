const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgroundController = require('../controllers/campgrounds.js')
const {isLoggedIn, isAuthor, validateCampground} = require('../utils/middleware.js');
const multer = require('multer')
const {storage} = require('../cloudinary')
const uplaod = multer({storage});


router.route('/')
        .get(catchAsync(campgroundController.index))
        .post(isLoggedIn, uplaod.array('image'), validateCampground,catchAsync(campgroundController.createCampground))

// router.get('/' ,catchAsync(campgroundController.index))
// router.post('/' , isLoggedIn ,validateCampground ,catchAsync(campgroundController.createCampground))

router.get('/new' , isLoggedIn , catchAsync(campgroundController.renderNewForm))

router.route("/:id")
    .get(catchAsync(campgroundController.showCampground))
    .put(isLoggedIn, isAuthor, uplaod.array('image') ,validateCampground ,catchAsync(campgroundController.editCampground))
    .delete(isLoggedIn, isAuthor ,catchAsync(campgroundController.deleteCampground) )

// router.get('/:id' ,catchAsync(campgroundController.showCampground))
// router.put('/:id', isLoggedIn, isAuthor ,validateCampground ,catchAsync(campgroundController.editCampground))
// router.delete("/:id", isLoggedIn, isAuthor ,catchAsync(campgroundController.deleteCampground) )


router.get('/:id/edit', isLoggedIn, isAuthor ,catchAsync(campgroundController.renderEditForm))


module.exports = router;