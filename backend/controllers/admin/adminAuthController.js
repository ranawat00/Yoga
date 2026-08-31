const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { sendTokenResponse } = require('../../utils/authHelpers');

/**
 * @desc    Register a new Admin
 * @route   POST /api/auth/admin/register
 * @access  Public (Requires optional secret key match if configured)
 */
exports.registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, adminSecretKey } = req.body;

    const validSecretKey = process.env.ADMIN_SECRET_KEY || 'YOGA_HEALERS_ADMIN_SECRET_2026';
    if (adminSecretKey && adminSecretKey !== validSecretKey) {
      return res.status(403).json({
        success: false,
        message: 'Invalid Admin Secret Security Key.'
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.'
      });
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: 'admin'
    });

    await sendTokenResponse(admin, 201, res, req);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login Admin
 * @route   POST /api/auth/admin/login
 * @access  Public
 */
exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin email or password.'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Account does not have administrator privileges.'
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin email or password.'
      });
    }

    await sendTokenResponse(user, 200, res, req);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout Admin API
 * @route   POST /api/auth/admin/logout
 * @access  Public
 */
exports.logoutAdmin = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    let userId = null;

    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key_yoga_healers_654321'
        );
        userId = decoded.id;
      } catch (err) {}
    }

    if (userId && refreshToken) {
      await User.findByIdAndUpdate(userId, {
        $pull: { refreshTokens: { token: refreshToken } }
      });
    }

    res.cookie('token', 'none', {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 1000)
    });
    res.cookie('refreshToken', 'none', {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 1000)
    });

    res.status(200).json({
      success: true,
      message: 'Admin logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};
