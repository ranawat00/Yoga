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

    const formattedPaymentMethod = (paymentMethod || 'UPI').toUpperCase();
    const validPaymentMethods = ['UPI', 'CARD', 'COD'];
    const finalPaymentMethod = validPaymentMethods.includes(formattedPaymentMethod) ? formattedPaymentMethod : 'UPI';

    const order = await Order.create({
      userId,
      name: name || 'Guest Customer',
      email: email || 'customer@yogahealers.org',
      phone: phone || '+91 99999 99999',
      address: address || '123 Main Street',
      city: city || 'Mumbai',
      pincode: pincode || '400001',
      items: items && items.length > 0 ? items : [
        {
          product: { id: 'p1', title: 'Yoga Package', price: total || 1499 },
          quantity: 1
        }
      ],
      subtotal: subtotal || total || 1499,
      shipping: shipping !== undefined ? shipping : 0,
      gst: gst !== undefined ? gst : 0,
      total: total || 1499,
      paymentMethod: finalPaymentMethod,
      paymentId: paymentId || `PAY-${Date.now()}`
    });

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to place order. Please try again.',
      error: error.message
    });
  }
};

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

