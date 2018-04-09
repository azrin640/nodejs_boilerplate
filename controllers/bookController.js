const mongoose = require('mongoose');
const User = mongoose.model('User');
const Book = mongoose.model('Book');
const promisify = require('es6-promisify');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

// *** CREATE A BOOK ***
// 1. Render product form
exports.registerBook = (req, res) => {
  const user = res.locals.user;
  res.render('registerBook', {title: 'Daftar Buku', user});
};

// Upload photo, resize photo, save photo and product info to db
// Use multer functions to upload photo, store in local memory and check photo filetype
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
      const isPhoto = file.mimetype.startsWith('image/');
      if(isPhoto){
          next(null, true);
      } else {
          next({ message: 'That filetype isn\'t allowed'}, false);
      }
  }
};
// 2. Send upload file/photo to multerOptions function
exports.upload = multer(multerOptions).single('photo');
// 3. Resize photo using JIMP
exports.resize = async (req, res, next) => {
  // check if there is no new file to upload
  if (!req.file) {
      next(); //skip to next middleware
      return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // Now resize and upload file/photos to public/uploads
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(400, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
};

// 4. Validate form

exports.validateRegisterBookForm = (req, res, next) => {
  req.sanitizeBody('title');
  req.checkBody('title', 'You must supply a title').notEmpty();
  req.sanitizeBody('subtitle');
  req.checkBody('subtitle', 'You must supply a subtitle').notEmpty();
  req.sanitizeBody('synopsis');
  req.checkBody('synopsis', 'You must supply a synopsis').notEmpty();
  req.sanitizeBody('tags');
  req.checkBody('tags', 'You must supply a tags').notEmpty();
  const errors = req.validationErrors();
  if(errors) {
    return;
  }
  next();
}
// 5. Save into database
exports.register = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    subtitle: req.body.subtitle,
    synopsis: req.body.synopsis,
    tags: req.body.tags,
    photo: req.body.photo,
    author: req.body.author
  });
  await book.save();
  res.redirect('/admin');
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const book = await Book.findByIdAndRemove({_id: req.params.id});
  res.redirect('/admin');
}

// Retrieve a book from database for admin
exports.getBook = async (req, res) => {
  const book = await Book.findOne({_id: req.params.id}).populate('chapters');
  res.render('book', {title: 'Edit Buku', book});
};

// Retreive a book from database for user
exports.displayBook = async (req, res) => {
  const book = await Book.findOne({_id: req.params.id}).populate('author').populate('chapters');
  //res.json(book);
  res.render('displayBook', {title: 'Maklumat Buku', book});
};

// Edit a Book
exports.editBook = async(req, res) => {
  const book = await Book.findOneAndUpdate(
    {_id: req.params.id},
    {
      title: req.body.title,
      subtitle: req.body.subtitle,
      synopsis: req.body.synopsis,
      tags: req.body.tags
    }
  );
  res.redirect('back');
};
