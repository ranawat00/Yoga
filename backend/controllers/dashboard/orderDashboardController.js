const Order = require('../../models/Order');

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
 * @desc    GET /api/dashboard/orders (Dynamic Database Query)
 * @access  Public / Admin
 */
exports.getDashboardOrders = async (req, res) => {
  disableCache(res);
  try {
    const orders = await safeDbCall(() => Order.find().sort({ createdAt: -1 }), []);

    const data = orders.map(ord => ({
      id: ord._id.toString().slice(-6).toUpperCase(),
      customer: ord.name || 'Customer',
      email: ord.email || 'N/A',
      items: ord.items ? ord.items.map(i => i.product?.title || 'Yoga Package').join(', ') : 'Yoga Package',
      total: ord.total || 0,
      payment: ord.paymentMethod || 'Online',
      status: ord.status || 'Completed',
      date: ord.createdAt ? new Date(ord.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    }));

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
  }
};
