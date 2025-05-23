const User = require('../models/user');

module.exports.renderRegisterForm = (req, res)=>{
    res.render('users/register'); 
}

module.exports.registerUser = async(req, res, next)=>{
    try{
        const {name, email, username, password} = req.body.user;
        const user = new User({name, email, username});
        const registeredUser =  await User.register(user, password)
        req.login(registeredUser, err =>{
            if(err) return next(err)
            req.flash('success', 'Welocme to Yelp Camp!!')
            res.redirect('/campgrounds');
        })
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.loginUserForm = (req, res)=>{
    res.render('users/login');
}

module.exports.loginUser = async(req, res)=>{
    req.flash('success', 'Welocome back!!')
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res)=>{
    req.logout(function(err){
        if(err){
            next(err);
        }
        req.flash('success', "Thanks for Visiting!!")
        res.redirect('/campgrounds');
    });
}