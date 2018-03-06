const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require ('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');
const promisify = require('es6-promisify');

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: 'Please supply a name',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Please supply an email address'
    },
    mobile: Number,
    phone: Number,
    address: {
      address: String,
      postcode: Number,
      city: String,
      state: String,
      country: String
    },
    cart: [{type: mongoose.Schema.ObjectId, ref: 'Cart'}],
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

userSchema.index({
    name: 'text'
});

userSchema.virtual('gravatar').get(function(){
    const hash = md5(this.email);
    return `https://gravatar.com/avatar/${hash}?size=200`;
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
