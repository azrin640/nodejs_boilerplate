const mongoose = require('mongoose');
const User = mongoose.model('User');
const Book = mongoose.model('Book');
const Chapter = mongoose.model('Chapter');
const promisify = require('es6-promisify');
const asciiStringSplit = require('ascii-string-split');

exports.registerChapter = (req, res) => {
  const book = req.params.id;
  res.render('registerChapter', {title: 'Daftar Bab', book});
};

exports.validateChapter = (req, res, next) => {
  req.sanitizeBody('number');
  req.checkBody('number', 'You must supply a chapter').notEmpty();
  req.sanitizeBody('title');
  req.checkBody('title', 'You must supply title').notEmpty();
  req.sanitizeBody('text');
  req.checkBody('text', 'You must supply text').notEmpty();
  req.sanitizeBody('tags');
  req.checkBody('tags', 'You must supply at least one tag').notEmpty();
  const errors = req.validationErrors();
  if(errors) {
    return;
  }
  next();
};

exports.saveChapter = async (req, res) => {
  const chapter = new Chapter(req.body);
  await chapter.save();
  res.redirect(`/admin/buku/${chapter.book}`);
};

exports.editChapter = async (req, res) => {
  const chapter = await Chapter.findOne({_id: req.params.id});
  res.render('editChapter', {title: 'Edit Bab', chapter});
};

exports.updateChapter = async (req, res) => {
  const chapter = await Chapter.findOneAndUpdate(
    {_id: req.params.id},
    {
      $set: {
        number: req.body.number,
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        author: req.body.author
      }
    }
  );
  res.redirect(`/admin/buku/${chapter.book}`);
};

exports.deleteChapter = async (req, res) => {
  const chapter = await Chapter.findOne({_id: req.params.id});
  await Chapter.findByIdAndRemove({_id: req.params.id});
  res.redirect(`/admin/buku/${chapter.book}`);
};

exports.displayChapter = async (req, res) => {
  const chapter = await Chapter.findOne({_id: req.params.id});
  //res.json(chapter);
  res.render('chapter', {title: `Bab ${chapter.number}`, chapter});
};

exports.flipChapter = async (req, res) => {
  const chapter = await Chapter.findOne({_id: req.params.id});
  var myString = chapter.text;
  var strLength = 2000;
  var results = asciiStringSplit(myString, strLength);
  //res.json(results);
  res.render('flip-chapter', {title: `Bab ${chapter.number}`, chapter, results});
};
