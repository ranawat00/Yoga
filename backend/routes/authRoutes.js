const express = require('express');
const router = express.Router();

// Import Controllers from Barrel Exports
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
  googleAuth,
  facebookAuth
} = require('../controllers/auth');

const {
  registerAdmin,
  loginAdmin,
  logoutAdmin
} = require('../controllers/admin');

// Import validators & middleware
const {
  signupValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../validators/authValidator');
const validate = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');

// ==========================================
// 🛡️ ADMIN AUTHENTICATION ROUTES
// ==========================================
router.post('/admin/register', registerAdmin);
router.post('/admin/signup', registerAdmin);
router.post('/admin/login', loginAdmin);
router.post('/admin/logout', logoutAdmin);

// ==========================================
// 👤 USER / STUDENT / PARENT AUTH ROUTES
// ==========================================
router.post('/signup', signupValidator, validate, registerUser);
router.post('/login', loginValidator, validate, loginUser);
router.post('/logout', logoutUser);
router.post('/verify-token', verifyToken);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPasswordValidator, validate, forgotPassword);
router.put('/reset-password/:resettoken', resetPasswordValidator, validate, resetPassword);

// ==========================================
// 🌐 SOCIAL OAUTH ROUTES
// ==========================================
router.post('/google', googleAuth);
router.post('/facebook', facebookAuth);

// ==========================================
// 🔒 PROTECTED ACCOUNT ROUTES
// ==========================================
router.get('/me', protect, getMe);
router.post('/logout-all', protect, logoutAllDevices);
router.put('/updatedetails', protect, updateDetails);

module.exports = router;
