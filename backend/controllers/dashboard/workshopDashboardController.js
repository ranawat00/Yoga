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
 * @desc    GET /api/dashboard/workshops (Dynamic Aggregation from Registrations)
 * @access  Public / Admin
 */
exports.getDashboardWorkshops = async (req, res) => {
  disableCache(res);
  try {
    const workshopAgg = await safeDbCall(() => Registration.aggregate([
      { $group: { _id: '$workshopTitle', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]), []);

    const data = workshopAgg.map((w, idx) => ({
      id: idx + 1,
      title: w._id || 'Yoga Workshop',
      registrationsCount: w.count,
      status: 'Active',
      category: 'Health & Wellness'
    }));

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch workshops', error: error.message });
  }
};
