const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const slug = require('slugs');

const bookSchema = new mongoose.Schema ({
  title: {
    type: String,
    trim: true,
    required: 'Please enter book title'
  },
  subtitle: {
    type: String,
    trim: true,
    required: 'Please enter book subtitle'
  },
  number: Number,
  tags: String,
  synopsis: {
    type: String,
    trim: true,
    required: 'Please enter book synopsis'
  },
  photo: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  },
  created:{
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
},
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

bookSchema.pre('save', function(next){
  if(!this.isModified('title')){
    next();
    return;
  }
  this.slug = slug(this.title);
  next();
});

bookSchema.virtual('chapters', {
  ref: 'Chapter',
  localField: '_id',
  foreignField: 'book'
});

module.exports = mongoose.model('Book', bookSchema);
