const User = require('../../models/User');
const { sendTokenResponse } = require('../../utils/authHelpers');

/**
 * @desc    Google OAuth Login/Signup
 * @route   POST /api/auth/google
 * @access  Public
 */
exports.googleAuth = async (req, res, next) => {
  try {
    const { email, name, googleId, role } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Google authentication requires email address'
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = user.authProvider || 'google';
        await user.save({ validateBeforeSave: false });
      }
    } else {
      user = await User.create({
        name: name || 'Google User',
        email,
        googleId,
        authProvider: 'google',
        role: role || 'user'
      });
    }

    await sendTokenResponse(user, 200, res, req);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Facebook OAuth Login/Signup
 * @route   POST /api/auth/facebook
 * @access  Public
 */
exports.facebookAuth = async (req, res, next) => {
  try {
    const { email, name, facebookId, role } = req.body;

    if (!email && !facebookId) {
      return res.status(400).json({
        success: false,
        message: 'Facebook authentication requires email or Facebook ID'
      });
    }

    const query = [];
    if (email) query.push({ email });
    if (facebookId) query.push({ facebookId });

    let user = await User.findOne({ $or: query });

    if (user) {
      if (!user.facebookId) {
        user.facebookId = facebookId;
        user.authProvider = user.authProvider || 'facebook';
        await user.save({ validateBeforeSave: false });
      }
    } else {
      user = await User.create({
        name: name || 'Facebook User',
        email: email || `${facebookId}@facebook.com`,
        facebookId,
        authProvider: 'facebook',
        role: role || 'user'
      });
    }

    await sendTokenResponse(user, 200, res, req);
  } catch (error) {
    next(error);
  }
};
