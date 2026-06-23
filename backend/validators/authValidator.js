const { check } = require('express-validator');

exports.signupValidator = [
  check('name', 'Name is required').notEmpty().trim(),
  check('email', 'Please include a valid email address').isEmail().normalizeEmail(),
  check('password', 'Password is required and must be 6 or more characters').isLength({ min: 6 })
];

exports.loginValidator = [
  check('email', 'Please include a valid email address').isEmail().normalizeEmail(),
  check('password', 'Password is required').exists()
];

exports.forgotPasswordValidator = [
  check('email', 'Please include a valid email address').isEmail().normalizeEmail()
];

exports.resetPasswordValidator = [
  check('password', 'Password is required and must be 6 or more characters').isLength({ min: 6 })
];
