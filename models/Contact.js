const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');

const contactSchema = new mongoose.Schema ({

  name: {
      type: String,
      required: 'Please supply a name',
      trim: true
  },
  email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Invalid Email Address'],
      required: 'Please supply an email address'
  },
  mobile: Number
});

module.exports = mongoose.model('Contact', contactSchema);
