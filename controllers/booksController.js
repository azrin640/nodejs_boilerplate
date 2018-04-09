const mongoose = require('mongoose');
const User = mongoose.model('User');
const Book = mongoose.model('Book');
const promisify = require('es6-promisify');

exports.getBooks = async(req, res) => {
  const user = res.locals.user;
  const books = await Book.find({author: user._id}).populate('chapters').populate('author');
  //res.json(books);
  res.render('admin', {title: 'Buku Buku Saya', books});
};

exports.getTag = async(req, res) => {
  //res.json(req.params.tag);
  var tag = req.params.tag;
  var newTag = '#' + tag
  const books = await Book.find({tags: newTag}).populate('author').populate('chapters');
  res.render('tag', {title: `Carian dari #${tag}`, books});
};
