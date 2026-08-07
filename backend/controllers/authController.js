const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id, jti: crypto.randomBytes(16).toString('hex') },
    process.env.JWT_SECRET || 'super_secret_jwt_key_yoga_healers_123456',
    { expiresIn: process.env.JWT_EXPIRE || '15m' }
  );
};

// Helper to generate refresh token
const generateRefreshToken = (id) => {
  return jwt.sign(
    { id, jti: crypto.randomBytes(16).toString('hex') },
    process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key_yoga_healers_654321',
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '3d' }
  );
};

// Helper to send token response
const sendTokenResponse = async (user, statusCode, res, req = null) => {
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Capture user-agent and IP info
  const userAgent = req ? req.headers['user-agent'] : 'Unknown';
  const ipAddress = req ? (req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress) : 'Unknown';

  if (!user.refreshTokens) {
    user.refreshTokens = [];
  }

  // Add new token session
  user.refreshTokens.push({
    token: refreshToken,
    userAgent,
    ipAddress
  });

  // Limit active sessions to 5 devices max
  const maxSessions = 5;
  if (user.refreshTokens.length > maxSessions) {
    user.refreshTokens = user.refreshTokens.slice(user.refreshTokens.length - maxSessions);
  }

  // Send IP Login Alert if it is a new IP
  if (req && user.knownIPs) {
    const isNewIP = !user.knownIPs.includes(ipAddress) && ipAddress !== 'Unknown';
    if (isNewIP) {
      user.knownIPs.push(ipAddress);
      
      const message = `A new login was detected on your Yoga Healers account from IP Address: ${ipAddress} (${userAgent}). If this wasn't you, please reset your password immediately.`;
      const html = `
        <h3>New Login Detected</h3>
        <p>A new login was detected on your Yoga Healers account with the following details:</p>
        <ul>
          <li><strong>IP Address:</strong> ${ipAddress}</li>
          <li><strong>Device/Browser:</strong> ${userAgent}</li>
          <li><strong>Time:</strong> ${new Date().toUTCString()}</li>
        </ul>
        <p>If this was you, you can safely ignore this email. Otherwise, please reset your password immediately to secure your account.</p>
      `;

      sendEmail({
        email: user.email,
        subject: 'Security Alert - New Login Detected',
        message,
        html
      }).catch(err => console.error('Failed to send IP security alert email:', err.message));
    }
  }

  // Reset lockout/attempts on successful login
  user.loginAttempts = 0;
  user.lockUntil = undefined;

  await user.save({ validateBeforeSave: false });

  // Set HTTP-Only cookies
  const isProduction = process.env.NODE_ENV === 'production';
  
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
  });

  res.status(statusCode).json({
    success: true,
    token,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    await sendTokenResponse(user, 201, res, req);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user (select password explicitly)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if account is currently locked
    if (user.isLocked) {
      const remainingTime = Math.ceil((user.lockUntil - Date.now()) / (60 * 1000));
      return res.status(423).json({
        success: false,
        message: `Account is locked due to multiple failed login attempts. Please try again after ${remainingTime} minutes.`
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      // Increment failed attempts
      user.loginAttempts += 1;
      
      // If failed 5 times, lock the account
      if (user.loginAttempts >= 5) {
        user.lockUntil = Date.now() + 15 * 60 * 1000; // 15 mins lockout
        await user.save({ validateBeforeSave: false });
        return res.status(423).json({
          success: false,
          message: 'Account locked for 15 minutes due to 5 failed login attempts.'
        });
      }
      
      await user.save({ validateBeforeSave: false });

      const attemptsLeft = 5 - user.loginAttempts;
      return res.status(401).json({
        success: false,
        message: `Invalid email or password. You have ${attemptsLeft} attempts remaining.`
      });
    }

    await sendTokenResponse(user, 200, res, req);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Log user out / clear cookie (if set)
 * @route   POST /api/auth/logout
 * @access  Public
 */
exports.logoutUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    let userId = null;

    // Verify refresh token to identify the user
    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key_yoga_healers_654321'
        );
        userId = decoded.id;
      } catch (err) {
        // Token is invalid/expired, proceed
      }
    }

    // Verify active access token as a backup
    if (!userId && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || 'super_secret_jwt_key_yoga_healers_123456'
        );
        userId = decoded.id;
      } catch (err) {
        // Token is invalid/expired, proceed
      }
    }

    // If user is identified and specific refreshToken is passed, pull it from their refreshTokens array
    if (userId && refreshToken) {
      await User.findByIdAndUpdate(userId, {
        $pull: { refreshTokens: { token: refreshToken } }
      });
    }

    // Clear cookies
    res.cookie('token', 'none', {
      httpOnly: true,
      expires: new Date(Date.now() + 10 * 1000)
    });
    res.cookie('refreshToken', 'none', {
      httpOnly: true,
      expires: new Date(Date.now() + 10 * 1000)
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Request forgot password email
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      // For security, return 200 OK so attackers don't know who has an account.
      return res.status(200).json({
        success: true,
        message: 'If the email is registered in our system, a password reset link has been sent'
      });
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    // Save token fields to DB
    await user.save({ validateBeforeSave: false });

    // Create reset URL
    // Can link to frontend page if FRONTEND_URL is set, otherwise fall back to host API route
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to:\n\n${resetUrl}\n\nThis link will expire in 10 minutes.`;
    const html = `
      <h3>Password Reset Request</h3>
      <p>You are receiving this email because you (or someone else) have requested the reset of a password.</p>
      <p>Please click the link below to reset your password. This link will expire in 10 minutes.</p>
      <a href="${resetUrl}" target="_blank" style="display:inline-block;padding:10px 20px;background-color:#4CAF50;color:white;text-decoration:none;border-radius:5px;">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Yoga Healers - Password Reset Request',
        message,
        html
      });

      res.status(200).json({
        success: true,
        message: 'If the email is registered in our system, a password reset link has been sent'
      });
    } catch (err) {
      console.error('Failed to send reset email:', err.message);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: 'Email could not be sent'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reset password
 * @route   PUT /api/auth/reset-password/:resettoken
 * @access  Public
 */
exports.resetPassword = async (req, res, next) => {
  try {
    // Hash token to compare with database token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset token'
      });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    await sendTokenResponse(user, 200, res, req);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get currently logged in user profile (for verification/testing purposes)
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = async (req, res, next) => {
  try {
    // req.user is attached by protect middleware
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile details
 * @route   PUT /api/auth/updatedetails
 * @access  Private
 */
exports.updateDetails = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email
    };

    // If updating email, check if it's already taken
    if (req.body.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser && existingUser.id !== req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'This email is already in use by another account.'
        });
      }
    }

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Verify if an access token is valid
 * @route   POST /api/auth/verify-token
 * @access  Public
 */
exports.verifyToken = async (req, res, next) => {
  try {
    let token = req.body.token || req.query.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_yoga_healers_123456');
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Token is valid',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token is invalid or expired',
      expired: error.name === 'TokenExpiredError'
    });
  }
};

/**
 * @desc    Get new access token from refresh token
 * @route   POST /api/auth/refresh-token
 * @access  Public
 */
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key_yoga_healers_654321'
    );

    // Find user who has this specific refresh token in their active session list
    const user = await User.findOne({
      _id: decoded.id,
      'refreshTokens.token': refreshToken
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
    }

    // Generate new access and refresh tokens (rotation)
    const newAccessToken = generateToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    // Capture request context details
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const ipAddress = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress || 'Unknown';

    // Replace the old token session in the database with the rotated one
    await User.updateOne(
      { _id: user._id, 'refreshTokens.token': refreshToken },
      {
        $set: {
          'refreshTokens.$.token': newRefreshToken,
          'refreshTokens.$.userAgent': userAgent,
          'refreshTokens.$.ipAddress': ipAddress,
          'refreshTokens.$.createdAt': new Date()
        }
      }
    );

    // Set updated cookies
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.cookie('token', newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 3 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      token: newAccessToken,
      refreshToken: newRefreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Refresh token error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token'
    });
  }
};

/**
 * @desc    Log out of all active devices / revoke all refresh tokens
 * @route   POST /api/auth/logout-all
 * @access  Private
 */
exports.logoutAllDevices = async (req, res, next) => {
  try {
    // req.user is populated by protect middleware
    await User.findByIdAndUpdate(req.user.id, {
      $set: { refreshTokens: [] }
    });

    // Clear cookies
    res.cookie('token', 'none', {
      httpOnly: true,
      expires: new Date(Date.now() + 10 * 1000)
    });
    res.cookie('refreshToken', 'none', {
      httpOnly: true,
      expires: new Date(Date.now() + 10 * 1000)
    });

    res.status(200).json({
      success: true,
      message: 'Successfully logged out of all active devices and sessions'
    });
  } catch (error) {
    next(error);
  }
};
