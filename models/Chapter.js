const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const slug = require('slugs');

const chapterSchema = new mongoose.Schema ({
  created: {
    type: Date,
    default: Date.now
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    required: 'You must supply a book'
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  },
  number: Number,
  title: {
    type: String,
    required: 'You must supply a title'
  },
  text: {
    type: String,
    required: 'You must key in text'
  },
  tags: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
});

module.exports = mongoose.model('Chapter', chapterSchema);
