const express = require('express');
const router = express.Router();

// Import controllers
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getMe,
  updateDetails,
  verifyToken,
  refreshToken,
  logoutAllDevices,
  registerAdmin,
  loginAdmin,
  logoutAdmin
} = require('../controllers/authController');

// Import validators & middleware
const {
  signupValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../validators/authValidator');
const validate = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');

// Admin Auth Routes
router.post('/admin/register', registerAdmin);
router.post('/admin/signup', registerAdmin);
router.post('/admin/login', loginAdmin);
router.post('/admin/logout', logoutAdmin);

// Define API routes with middleware validations
router.post('/signup', signupValidator, validate, registerUser);
router.post('/login', loginValidator, validate, loginUser);
router.post('/logout', logoutUser);
router.post('/verify-token', verifyToken);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPasswordValidator, validate, forgotPassword);
router.put('/reset-password/:resettoken', resetPasswordValidator, validate, resetPassword);

// Protected route to get user context
router.get('/me', protect, getMe);
router.post('/logout-all', protect, logoutAllDevices);
router.put('/updatedetails', protect, updateDetails);

module.exports = router;
