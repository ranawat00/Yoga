const Razorpay = require('razorpay');
const crypto = require('crypto');

const keyId = process.env.RAZORPAY_KEY_ID ? process.env.RAZORPAY_KEY_ID.trim() : '';
const keySecret = process.env.RAZORPAY_KEY_SECRET ? process.env.RAZORPAY_KEY_SECRET.trim() : '';

// Initialize Razorpay client
const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret
});

/**
 * @desc    Create a new Razorpay order
 * @route   POST /api/payment/create-order
 * @access  Public
 */
exports.createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body; // Amount in INR (e.g. 500)

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid payment amount.'
      });
    }

    const options = {
      amount: Math.round(amount * 100), // convert INR to paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Razorpay create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order. Please try again.'
    });
  }
};

/**
 * @desc    Verify Razorpay payment signature
 * @route   POST /api/payment/verify-payment
 * @access  Public
 */
exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification parameters missing.'
      });
    }

    if (!keySecret) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay key secret is not configured in the server environment.'
      });
    }

    // Generate signature payload
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(payload)
      .digest('hex');

    const isVerified = expectedSignature === razorpay_signature;

    if (isVerified) {
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully.'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed. Invalid signature.'
      });
    }
  } catch (error) {
    console.error('Razorpay verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment.'
    });
  }
};
