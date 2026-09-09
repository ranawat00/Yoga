const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../../models/Order');

const keyId = process.env.RAZORPAY_KEY_ID ? process.env.RAZORPAY_KEY_ID.trim() : 'rzp_test_dummy_key_id';
const keySecret = process.env.RAZORPAY_KEY_SECRET ? process.env.RAZORPAY_KEY_SECRET.trim() : 'dummy_key_secret';

// Initialize Razorpay client safely with fallbacks for development
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
    const { amount, currency = 'INR' } = req.body;
    const targetCurrency = (currency || 'INR').toUpperCase();

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid payment amount.'
      });
    }

    const options = {
      amount: Math.round(amount * 100), // convert to smallest currency unit (paise / cents)
      currency: targetCurrency,
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

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(payload)
      .digest('hex');

    const isTestBypass = (process.env.NODE_ENV !== 'production') && 
      (razorpay_signature === 'test_bypass_signature' || razorpay_signature === 'test_mock_signature');

    const isVerified = isTestBypass || (expectedSignature === razorpay_signature);

    if (isVerified) {
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully.'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed. Invalid signature.',
        hint: 'In Postman testing, set razorpay_signature to "test_bypass_signature" or use a valid Razorpay HMAC SHA256 signature.'
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

/**
 * @desc    Handle Razorpay Webhook notifications (Server-to-Server)
 * @route   POST /api/payment/razorpay-webhook
 * @access  Public (Webhook signature verified)
 */
exports.handleRazorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const receivedSignature = req.headers['x-razorpay-signature'];

    console.log(`🔔 [Razorpay Webhook] Received event: ${req.body?.event || 'Unknown'}`);

    const isTestBypass = (process.env.NODE_ENV !== 'production') && 
      (receivedSignature === 'test_bypass_webhook' || !webhookSecret);

    if (!isTestBypass) {
      if (!webhookSecret) {
        console.warn('⚠️ [Razorpay Webhook] RAZORPAY_WEBHOOK_SECRET is not configured in .env');
        return res.status(500).json({ status: 'Server webhook secret missing' });
      }

      if (!receivedSignature) {
        console.warn('⚠️ [Razorpay Webhook] Missing x-razorpay-signature header');
        return res.status(400).json({ status: 'Signature missing' });
      }

      // Compute HMAC-SHA256 digest on the raw byte buffer or serialized payload
      const payloadData = req.rawBody ? req.rawBody : JSON.stringify(req.body);
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(payloadData)
        .digest('hex');

      if (expectedSignature !== receivedSignature) {
        console.warn('⚠️ [Razorpay Webhook] Invalid signature mismatch');
        return res.status(400).json({ status: 'Invalid signature' });
      }
    }

    // Process event types
    const event = req.body?.event;
    const payload = req.body?.payload;

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload?.payment?.entity || {};
      const orderEntity = payload?.order?.entity || {};

      const razorpayOrderId = paymentEntity.order_id || orderEntity.id;
      const razorpayPaymentId = paymentEntity.id;

      console.log(`✅ [Razorpay Webhook] Payment verified for Order ${razorpayOrderId}, Payment ${razorpayPaymentId}`);

      // Find order by Razorpay order id or payment id in MongoDB
      if (razorpayOrderId || razorpayPaymentId) {
        const query = {
          $or: [
            { paymentId: razorpayOrderId },
            { paymentId: razorpayPaymentId },
            { 'paymentDetails.razorpay_order_id': razorpayOrderId }
          ].filter(Boolean)
        };

        const updatedOrder = await Order.findOneAndUpdate(
          query,
          {
            status: 'Paid',
            paymentMethod: 'RAZORPAY',
            paymentDetails: {
              ...paymentEntity,
              razorpay_order_id: razorpayOrderId,
              razorpay_payment_id: razorpayPaymentId,
              webhookVerifiedAt: new Date()
            }
          },
          { new: true }
        );

        if (updatedOrder) {
          console.log(`📦 [Razorpay Webhook] Order #${updatedOrder._id} marked as PAID`);
        } else {
          console.log(`ℹ️ [Razorpay Webhook] No matching local order found for ${razorpayOrderId || razorpayPaymentId}`);
        }
      }
    } else if (event === 'payment.failed') {
      const paymentEntity = payload?.payment?.entity || {};
      const razorpayOrderId = paymentEntity.order_id;
      if (razorpayOrderId) {
        await Order.findOneAndUpdate(
          { paymentId: razorpayOrderId },
          { 
            status: 'Failed',
            paymentDetails: { ...paymentEntity, failedAt: new Date() }
          }
        );
        console.log(`❌ [Razorpay Webhook] Order ${razorpayOrderId} marked as FAILED`);
      }
    }

    // Razorpay requires a prompt 200 OK response
    res.status(200).json({ status: 'ok', received: true });
  } catch (error) {
    console.error('Razorpay webhook processing error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

/**
 * @desc    Programmatically register a webhook with Razorpay API
 * @route   POST /api/payment/register-webhook/razorpay
 * @access  Public
 */
exports.createRazorpayWebhookApi = async (req, res) => {
  try {
    const {
      url = `${req.protocol}://${req.get('host')}/api/payment/razorpay-webhook`,
      alert_email = 'admin@yogahealers.org',
      secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'yho_razorpay_webhook_secret_2026',
      events = ['order.paid', 'payment.captured', 'payment.failed']
    } = req.body;

    if (!keyId || !keySecret || keyId === 'rzp_test_dummy_key_id') {
      return res.status(400).json({
        success: false,
        message: 'Razorpay API keys (RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET) must be set in .env'
      });
    }

    // Razorpay requires events as an object: { "payment.captured": true, ... }
    let formattedEvents = {};
    if (Array.isArray(events)) {
      events.forEach((ev) => {
        formattedEvents[ev] = true;
      });
    } else if (typeof events === 'object' && events !== null) {
      formattedEvents = events;
    } else {
      formattedEvents = {
        'order.paid': true,
        'payment.captured': true,
        'payment.failed': true
      };
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const response = await fetch('https://api.razorpay.com/v1/webhooks', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
        alert_email,
        secret,
        events: formattedEvents
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: 'Razorpay returned error while creating webhook',
        error: data
      });
    }

    res.status(201).json({
      success: true,
      message: 'Razorpay Webhook created successfully!',
      webhook: data,
      hint: 'Remember to ensure RAZORPAY_WEBHOOK_SECRET matches in your .env'
    });
  } catch (error) {
    console.error('Create Razorpay Webhook error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    List all registered webhooks from Razorpay API
 * @route   GET /api/payment/webhooks/razorpay
 */
exports.listRazorpayWebhooksApi = async (req, res) => {
  try {
    if (!keyId || !keySecret || keyId === 'rzp_test_dummy_key_id') {
      return res.status(400).json({
        success: false,
        message: 'Razorpay API keys must be set in .env'
      });
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const response = await fetch('https://api.razorpay.com/v1/webhooks', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    const data = await response.json();
    res.status(response.status).json({
      success: response.ok,
      webhooks: data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
