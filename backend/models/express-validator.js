const HttpError = require('./http-error');
const { body, validationResult } = require('express-validator');

const emailValidator = () => body('email').trim().normalizeEmail().isEmail();
const passwordValidator = () => body('password').isLength({ min: 8 });

const signupUserValidaton = (req, res, next, user) => {
  const errors = validationResult(req);

  if (user) {
    return next(new HttpError('User with this email already exists!', 422));
  }

  if (!errors.isEmpty() && errors.errors[0].path === 'email') {
    return res.status(400).send('Invalid email address. Please try again.');
  }
  if (!errors.isEmpty() && errors.errors[0].path === 'password') {
    return res.status(400).send('Password must have at least 8 characters.');
  }
};

module.exports = {
  emailValidator,
  passwordValidator,
  signupUserValidaton,
};
