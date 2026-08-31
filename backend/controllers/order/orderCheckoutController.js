const Order = require('../../models/Order');
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
