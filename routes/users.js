const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');

router.get('/register', (req, res)=>{
    res.render('users/register');
})

router.post('/register', catchAsync(async(req, res)=>{
    try{
        const {name, email, username, password} = req.body.user;
        const user = new User({name, email, username});
        const registeredUser =  await User.register(user, password)
        console.log(registeredUser);
        req.flash('success', 'Welocme to Yelp Camp!!')
        res.redirect('/campgrounds');
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('/register');
    }
}))

router.get('/login', (req, res)=>{
    res.render('users/login');
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}) ,catchAsync(async(req, res)=>{

    req.flash('success', 'Welocome back!!')
    res.redirect('/campgrounds');
}))


module.exports = router;