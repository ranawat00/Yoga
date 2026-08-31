const User = require('../../models/User');
const Referral = require('../../models/Referral');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../../utils/sendEmail');
const { sendTokenResponse } = require('../../utils/authHelpers');

/**
 * @desc    Register a new user (Student or Parent/User)
 * @route   POST /api/auth/signup
 * @access  Public
 */
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, role, schoolName, studentId, studentName, referralId } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists'
      });
    }

    let verifiedReferral = null;

    // Mandatory validation & DB cross-referencing for student sign up
    if (role === 'student') {
      if (!schoolName || !studentId || !referralId) {
        return res.status(400).json({
          success: false,
          message: 'College/University Name, Student ID, and Referral ID are required for student registration.'
        });
      }

      // Check if referralId exists in Database
      const cleanRefCode = referralId.trim().toUpperCase();
      verifiedReferral = await Referral.findOne({ referralCode: cleanRefCode });

      if (!verifiedReferral) {
        return res.status(400).json({
          success: false,
          message: `Student Sign-Up Failed: Referral ID "${referralId}" is invalid. Student accounts can only be created with an active Referral ID created by Admin.`
        });
      }

      if (!verifiedReferral.isActive) {
        return res.status(400).json({
          success: false,
          message: `Student Sign-Up Failed: Referral ID "${referralId}" is currently deactivated by Admin.`
        });
      }

      if (verifiedReferral.expiryDate && new Date(verifiedReferral.expiryDate) < new Date()) {
        return res.status(400).json({
          success: false,
          message: `Student Sign-Up Failed: Referral ID "${referralId}" has expired.`
        });
      }

      if (verifiedReferral.maxUses && verifiedReferral.usedCount >= verifiedReferral.maxUses) {
        return res.status(400).json({
          success: false,
          message: `Student Sign-Up Failed: Referral ID "${referralId}" limit has been reached.`
        });
      }
    }

    // Mandatory verification for parent sign up (match student in DB)
    if (role === 'parent') {
      if (!studentName || !studentId) {
        return res.status(400).json({
          success: false,
          message: 'Student Name and Student ID are required for parent registration.'
        });
      }

      // Find student in DB
      const existingStudent = await User.findOne({
        role: 'student',
        studentId: studentId.trim(),
        name: { $regex: new RegExp(`^${studentName.trim()}$`, 'i') }
      });

      if (!existingStudent) {
        return res.status(400).json({
          success: false,
          message: `Parent Sign-Up Failed: No student account found matching Student Name "${studentName}" and Student ID "${studentId}". Parents can only sign up if their student is registered in the system.`
        });
      }
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone: phone || '',
      role: role || 'user',
      schoolName: role === 'student' ? schoolName : '',
      studentId: (role === 'student' || role === 'parent') ? studentId : '',
      studentName: role === 'parent' ? studentName : '',
      referralId: role === 'student' ? referralId : ''
    });

    if (verifiedReferral) {
      verifiedReferral.usedCount += 1;
      await verifiedReferral.save();
    }

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
    const { email, password, role } = req.body;

    // Check for user (select password explicitly)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify user role matches the login form role
    const expectedRole = role || 'user';
    if (user.role && user.role !== expectedRole) {
      if (expectedRole === 'student') {
        return res.status(400).json({
          success: false,
          message: 'This account is not registered as a student. Please log in as a parent.'
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'This account is registered as a student. Please log in using the Student form.'
        });
      }
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
      user.loginAttempts += 1;
      
      if (user.loginAttempts >= 5) {
        user.lockUntil = Date.now() + 15 * 60 * 1000;
        await user.save({ validateBeforeSave: false });
        return res.status(423).json({
          success: false,
          message: 'Account locked for 15 minutes due to 5 failed login attempts.'
        });
      }
      
      await user.save({ validateBeforeSave: false });
      return res.status(401).json({
        success: false,
        message: `Invalid email or password. Attempt ${user.loginAttempts} of 5 before temporary lockout.`
      });
    }

    await sendTokenResponse(user, 200, res, req);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user / clear cookie / invalidate refresh token
 * @route   POST /api/auth/logout
 * @access  Public
 */
exports.logoutUser = async (req, res, next) => {
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
      message: 'User logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Forgot password - generate reset token and send email
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'There is no user registered with that email address'
      });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) requested a password reset for your Yoga Healers account.\n\nPlease click on the following link, or paste it into your browser to complete the process:\n\n${resetUrl}\n\nThis link will expire in 10 minutes.\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;

    const html = `
      <h2>Yoga Healers - Password Reset Request</h2>
      <p>You requested a password reset for your account.</p>
      <p>Please click the button below to reset your password. This link is valid for 10 minutes:</p>
      <a href="${resetUrl}" style="background-color: #315C45; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 15px 0;">Reset Password</a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>If you did not request a password reset, please ignore this email.</p>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Yoga Healers - Password Reset Token',
        message,
        html
      });

      res.status(200).json({
        success: true,
        message: 'Password reset link sent to your email address'
      });
    } catch (err) {
      console.error('Email error:', err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: 'Email could not be sent. Please try again later.'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reset password using reset token
 * @route   PUT /api/auth/reset-password/:resettoken
 * @access  Public
 */
exports.resetPassword = async (req, res, next) => {
  try {
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
 * @desc    Get current logged in user details
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = async (req, res, next) => {
  try {
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
 * @desc    Update user details
 * @route   PUT /api/auth/updatedetails
 * @access  Private
 */
exports.updateDetails = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      schoolName: req.body.schoolName,
      studentId: req.body.studentId,
      studentName: req.body.studentName
    };

    Object.keys(fieldsToUpdate).forEach(
      (key) => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

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
 * @desc    Verify current access token
 * @route   POST /api/auth/verify-token
 * @access  Public
 */
exports.verifyToken = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'super_secret_jwt_key_yoga_healers_123456'
    );

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        valid: false,
        message: 'User no longer exists'
      });
    }

    res.status(200).json({
      success: true,
      valid: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        schoolName: user.schoolName,
        studentId: user.studentId,
        studentName: user.studentName,
        referralId: user.referralId
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      valid: false,
      message: 'Token is invalid or has expired'
    });
  }
};

/**
 * @desc    Refresh access token using refresh token
 * @route   POST /api/auth/refresh-token
 * @access  Public
 */
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: reqRefreshToken } = req.body;

    const tokenToVerify = reqRefreshToken || req.cookies.refreshToken;

    if (!tokenToVerify) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(
        tokenToVerify,
        process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key_yoga_healers_654321'
      );
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is invalid or has expired. Please log in again.'
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists'
      });
    }

    const tokenExists = user.refreshTokens && user.refreshTokens.some(t => t.token === tokenToVerify);
    if (!tokenExists) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token has been revoked or used on another session.'
      });
    }

    const newAccessToken = jwt.sign(
      { id: user._id, jti: crypto.randomBytes(16).toString('hex') },
      process.env.JWT_SECRET || 'super_secret_jwt_key_yoga_healers_123456',
      { expiresIn: process.env.JWT_EXPIRE || '15m' }
    );

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('token', newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 15 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      token: newAccessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        schoolName: user.schoolName,
        studentId: user.studentId,
        studentName: user.studentName,
        referralId: user.referralId
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout from all devices for user
 * @route   POST /api/auth/logout-all
 * @access  Private
 */
exports.logoutAllDevices = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $set: { refreshTokens: [] }
    });

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
      message: 'Successfully logged out of all active devices and sessions'
    });
  } catch (error) {
    next(error);
  }
};
