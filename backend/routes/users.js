const { Router } = require('express');
const {
  emailValidator,
  passwordValidator,
} = require('../models/express-validator');
const {
  getUsers,
  signupUser,
  loginUser,
  // signupUserWithGoogle,
  // loginUserWithGoogle,
  refreshToken,
} = require('../controllers/users');

// const fileUpload = require('../middleware/file-upload');

const router = Router();

router.post('/refreshtoken', refreshToken);

router.post(
  '/signup',
  // fileUpload.single('image'),
  [emailValidator(), passwordValidator()],
  signupUser
);

router.post('/login', loginUser);

// router.post('/signup/google', signupUserWithGoogle);

// router.post('/login/google', loginUserWithGoogle);

router.get('/', getUsers);

module.exports = router;
