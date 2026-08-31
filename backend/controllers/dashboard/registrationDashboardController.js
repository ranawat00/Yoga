const Registration = require('../../models/Registration');

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
 * @desc    GET /api/dashboard/registrations (Dynamic Database Query)
 * @access  Public / Admin
 */
exports.getDashboardRegistrations = async (req, res) => {
  disableCache(res);
  try {
    const registrations = await safeDbCall(() => Registration.find().sort({ createdAt: -1 }), []);

    const data = registrations.map((reg, index) => ({
      id: `REG-${100 + index}`,
      name: reg.name || 'Participant',
      phone: reg.phone || 'N/A',
      email: reg.email || 'N/A',
      workshop: reg.workshopTitle || '5-Day Online Yoga',
      batch: reg.batch || 'Morning Batch',
      couponCode: reg.couponCode || '',
      date: reg.createdAt ? new Date(reg.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      status: reg.status || 'REGISTERED'
    }));

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch registrations', error: error.message });
  }
};
