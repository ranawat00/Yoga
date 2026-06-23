const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

/**
 * @desc    Create a new order (supports guest and authenticated users)
 * @route   POST /api/orders
 * @access  Public
 */
exports.createOrder = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      city,
      pincode,
      items,
      subtotal,
      shipping,
      gst,
      total,
      paymentMethod,
      paymentId
    } = req.body;

    // Optional user attachment if logged in
    let userId = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || 'super_secret_jwt_key_yoga_healers_123456'
        );
        userId = decoded.id;
      } catch (err) {
        // Ignore token errors for guest checkout
      }
    }

    const order = await Order.create({
      userId,
      name,
      email,
      phone,
      address,
      city,
      pincode,
      items,
      subtotal,
      shipping,
      gst,
      total,
      paymentMethod,
      paymentId
    });

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place order. Please try again.'
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
