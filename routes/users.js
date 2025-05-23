const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const usersController = require('../controllers/users');
const passport = require('passport');
const {storeReturnTo} = require('../utils/middleware');


router.get('/register', usersController.renderRegisterForm)

router.post('/register', catchAsync(usersController.registerUser))

router.get('/login',usersController.loginUserForm )

router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}) ,catchAsync(usersController.loginUser))

router.get('/logout', usersController.logoutUser)


module.exports = router;