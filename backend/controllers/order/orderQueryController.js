const Order = require('../../models/Order');

/**
 * @desc    Get all orders (for admin / dashboard)
 * @route   GET /api/orders
 * @access  Public / Admin
 */
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders.',
      error: error.message
    });
  }
};

/**
 * @desc    Get currently logged in user's orders
 * @route   GET /api/orders/my-orders
 * @access  Private
 */
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve order history.'
    });
  }
};
