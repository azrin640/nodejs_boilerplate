const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jquery = require('jquery');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});

exports.loginModal = (req, res) => {
  passport.authenticate('local', function(err, user, info){
    if (user){
      req.logIn(user, function(err) {
        if(err){
          res.json(err);
        }
        var respond = {
          success: "You are logged in.",
          status: 200
        };
        res.json(respond);
      });
    }else{
      res.json(err);
    }
  })(req, res);
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
    return;
  };
  res.redirect('/');
}
