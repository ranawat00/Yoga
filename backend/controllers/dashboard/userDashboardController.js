const User = require('../../models/User');

const disableCache = (res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
};

const safeDbCall = async (fn, fallback = []) => {
  try {
    return await fn();
  } catch (err) {
    console.warn('MongoDB query notice:', err.message);
    return fallback;
  }
};

/**
 * @desc    GET /api/dashboard/users (Dynamic Database Query)
 * @access  Public / Admin
 */
exports.getDashboardUsers = async (req, res) => {
  disableCache(res);
  try {
    const users = await safeDbCall(() => User.find().sort({ createdAt: -1 }), []);

    const data = users.map(usr => ({
      id: usr._id.toString().slice(-6).toUpperCase(),
      name: usr.name || 'User',
      email: usr.email || 'N/A',
      role: usr.role || 'user',
      schoolName: usr.schoolName || '',
      studentId: usr.studentId || '',
      referralId: usr.referralId || '',
      dateJoined: usr.createdAt ? new Date(usr.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      status: 'Active'
    }));

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message });
  }
};
