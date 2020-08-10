const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
  res.render('users/signin.hbs');
});

router.post('/users/signin' , passport.authenticate('local',{
  successRedirect: '/notes',
  failureRedirect: '/users/signin',
  failureFlash: true,
}));

router.get('/users/signup', (req, res) => {
  res.render('users/signup.hbs');
});

router.post('/users/signup', async (req,res) => {
    const {name, email, password, confirm_password} = req.body;
    const errors = [];
    if(password.length < 4) errors.push({msg: 'Password too short'});
    if(password != confirm_password) errors.push({msg: 'Pwd must match'});
    if(errors.length > 0){
      res.render('users/signup.hbs', {errors, name, email, password, confirm_password})
    }else{
      const isThereUser = await User.findOne({email:email});
      if (isThereUser) {
        req.flash('error_msg', 'The email i already in use');
        res.redirect('/users/signup');
      }else{
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You\'re registred');
        res.redirect('/users/signin');
      }
    }
  }
);

router.get('/users/signout', (req, res) => {
  req.logOut();
  res.redirect('/');
})

module.exports = router;