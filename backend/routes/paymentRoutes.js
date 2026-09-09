const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  handleRazorpayWebhook,
  createRazorpayWebhookApi,
  listRazorpayWebhooksApi,
  createPayPalOrder,
  capturePayPalOrder,
  checkPayPalOrderStatus,
  handlePayPalWebhook,
  createPayPalWebhookApi,
  listPayPalWebhooksApi
} = require('../controllers/payment');

// ── Razorpay Payment & Webhook Routes ──
router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.post('/razorpay-webhook', handleRazorpayWebhook);
router.post('/webhook', handleRazorpayWebhook); // alias for standard webhook url
router.post('/register-webhook/razorpay', createRazorpayWebhookApi); // Programmatic Webhook Creator
router.get('/webhooks/razorpay', listRazorpayWebhooksApi);           // List Webhooks

// ── PayPal Payment & Webhook Routes ──
router.post('/paypal/create-order', createPayPalOrder);
router.post('/paypal/capture-order', capturePayPalOrder);
router.get('/paypal/order-status/:orderId', checkPayPalOrderStatus);
router.post('/paypal-webhook', handlePayPalWebhook);
router.post('/register-webhook/paypal', createPayPalWebhookApi);     // Programmatic Webhook Creator
router.get('/webhooks/paypal', listPayPalWebhooksApi);               // List Webhooks

module.exports = router;
