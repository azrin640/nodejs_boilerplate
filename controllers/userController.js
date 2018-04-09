const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const crypto = require('crypto');
const request = require('request');

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('email', 'That email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
      remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password cannot be blank').notEmpty();
  req.checkBody('password_repeat', 'Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if(errors) {
      //res.render('page-register', {title: 'Register Form', body: req.body});
      return;
  }
  next();
}

exports.register = async (req, res) => {
  const user = new User({
      name: req.body.name,
      email: req.body.email
  });
  const register = promisify(User.register, User);
  const result = await register(user, req.body.password);
  if(result){
    var respond = {
      success: "An authentication email has been sent to you.",
      status: 200
    }
    res.json(respond);
  } else {
    return;
  }
};

exports.login = (req, res) => {
  res.render('login', {title: 'Login'});
};

exports.validateUpdateProfile = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('email', 'That email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
      remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false
  });
  req.checkBody('mobile', 'You must supply a mobile number').notEmpty();
  req.checkBody('phone', 'You must supply a phone number').notEmpty();
  console.log(req.body);
  const errors = req.validationErrors();
  if(errors) {
      //res.render('page-register', {title: 'Register Form', body: req.body});
      return;
  }
  next();
};

exports.updateProfile = async (req, res) => {
  const result = await User.findOneAndUpdate(
    {email: req.body.email},
    {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      phone: req.body.phone
    }
  );
  if(result){
    var respond = {
      success: "An authentication email has been sent to you.",
      status: 200
    }
    res.json(respond);
  } else {
    return;
  }
};

exports.facebookProfile = async (req, res) => {
  const _id = req.body.id;
  const facebook = req.body.facebook;
  const result = await User.findOneAndUpdate(
    {_id},
    {facebook}
  );
  if(result){
    var respond = {
      success: "An authentication email has been sent to you.",
      status: 200
    }
    res.json(respond);
  } else {
    return;
  }
};
