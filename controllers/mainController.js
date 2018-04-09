const mongoose = require('mongoose');
const User = mongoose.model('User');
const Book = mongoose.model('Book');
const Chapter = mongoose.model('Chapter');
const Contact = mongoose.model('Contact');
const promisify = require('es6-promisify');

exports.getBooks = async (req, res) => {
  const books = await Book.find().populate('author').populate('author').populate('chapters');
  //res.json(books);
  res.render('home', {title: 'Buku Buku Terbaru', books});
};

exports.contactForm = (req, res) => {
  res.render('contact', {title: 'Hubungi Kami'})
};

exports.registerContact = async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile
  });
  await contact.save();
  res.redirect('back', {message: 'Terima kasih kerana menghubungi kami, kami akan menghubungi anda semula secepat mungkin'});
};
