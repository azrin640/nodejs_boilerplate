const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');
const booksController = require('../controllers/booksController');
const chapterController = require('../controllers/chapterController');
const mainController = require('../controllers/mainController');
const { catchErrors } = require('../handlers/errorHandlers');

// Base Pages
router.get('/', mainController.getBooks);

router.get('/buku-buku', mainController.getBooks);

router.get('/contact', mainController.contactForm);
router.post('/contact', catchErrors(mainController.registerContact));

// Register
router.post('/register',
  userController.validateRegister,
  catchErrors(userController.register),
  //authController.login
);

// Login
router.get('/login', userController.login);
router.post('/login', authController.login);
router.post('/login-modal', authController.loginModal);

// Update profile
router.post('/profile/update',
  authController.isLoggedIn,
  userController.validateUpdateProfile,
  catchErrors(userController.updateProfile)
);

// Logout
router.get('/logout', authController.logout);

// ** ADDITIONAL **
// Register a Book
router.get('/admin/daftar-buku',
  authController.isLoggedIn,
  bookController.registerBook
);
router.post('/admin/daftar-buku',
  bookController.upload,
  bookController.resize,
  bookController.validateRegisterBookForm,
  catchErrors(bookController.register)
);

// Delete a book
router.get('/admin/padam-buku/:id', catchErrors(bookController.deleteBook));

// View user books
router.get('/admin',
  authController.isLoggedIn,
  catchErrors(booksController.getBooks)
);

// View admin selected book
router.get('/admin/buku/:id',
  authController.isLoggedIn,
  catchErrors(bookController.getBook)
);

router.post('/admin/buku/:id',
  authController.isLoggedIn,
  catchErrors(bookController.editBook)
);


// Register a chapter
router.get('/admin/daftar-bab/:id',
  authController.isLoggedIn,
  chapterController.registerChapter
);
router.post('/admin/daftar-bab/:id',
  authController.isLoggedIn,
  chapterController.validateChapter,
  catchErrors(chapterController.saveChapter)
);

// Edit a chapter
router.get('/admin/edit-bab/:id',
  authController.isLoggedIn,
  catchErrors(chapterController.editChapter)
);

router.post('/admin/edit-bab/:id',
  chapterController.validateChapter,
  catchErrors(chapterController.updateChapter)
);

// Delete a chapter
router.get('/admin/padam-bab/:id',
  authController.isLoggedIn,
  catchErrors(chapterController.deleteChapter)
);

// Update facebook url
router.post('/facebook/update', catchErrors(userController.facebookProfile));

// Display a book to a user
router.get('/buku/:id', catchErrors(bookController.displayBook));

// User read a chapter
//router.get('/bab/:id', catchErrors(chapterController.displayChapter));

// User read a chapter
router.get('/bab/:id', catchErrors(chapterController.flipChapter));

router.get('/tags/:tag', catchErrors(booksController.getTag));


module.exports = router;
