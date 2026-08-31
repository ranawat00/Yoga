const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('./sendEmail');

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
      role: user.role,
      schoolName: user.schoolName,
      studentId: user.studentId,
      studentName: user.studentName,
      referralId: user.referralId,
      createdAt: user.createdAt
    }
  });
};

module.exports = {
  generateToken,
  generateRefreshToken,
  sendTokenResponse
};
