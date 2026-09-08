const crypto = require('crypto');
const Order = require('../../models/Order');

const paypalClientId = process.env.PAYPAL_CLIENT_ID ? process.env.PAYPAL_CLIENT_ID.trim() : '';
const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET ? process.env.PAYPAL_CLIENT_SECRET.trim() : '';
const paypalWebhookId = process.env.PAYPAL_WEBHOOK_ID ? process.env.PAYPAL_WEBHOOK_ID.trim() : '';
const isPayPalConfigured = paypalClientId && paypalClientSecret && !paypalClientId.startsWith('your_');
const paypalBaseUrl = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

/**
 * Helper to fetch PayPal OAuth2 Access Token
 */
async function getPayPalAccessToken() {
  if (!isPayPalConfigured) {
    throw new Error('PayPal credentials not configured in environment.');
  }

  const auth = Buffer.from(`${paypalClientId}:${paypalClientSecret}`).toString('base64');
  const response = await fetch(`${paypalBaseUrl}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description || 'Failed to get PayPal access token');
  }
  return data.access_token;
}

/**
 * @desc    Create a PayPal order
 * @route   POST /api/payment/paypal/create-order
 * @access  Public
 */
exports.createPayPalOrder = async (req, res) => {
  try {
    const { amount, currency = 'USD' } = req.body;

    if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    // In dev without credentials, provide mock order ID
    if (!isPayPalConfigured) {
      return res.status(200).json({
        success: true,
        orderId: `MOCK-PAYPAL-ORDER-${Date.now()}`,
        status: 'CREATED',
        note: 'Mock PayPal order created for development (set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env for live integration)'
      });
    }

    const accessToken = await getPayPalAccessToken();

    const response = await fetch(`${paypalBaseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: parseFloat(amount).toFixed(2)
            }
          }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ success: false, error: data });
    }

    res.status(200).json({
      success: true,
      orderId: data.id,
      status: data.status,
      links: data.links
    });
  } catch (error) {
    console.error('PayPal create order error:', error);
    res.status(500).json({ success: false, message: error.message || 'PayPal order creation failed' });
  }
};

/**
 * @desc    Capture a PayPal payment
 * @route   POST /api/payment/paypal/capture-order
 * @access  Public
 */
exports.capturePayPalOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: 'orderId is required' });
    }

    if (orderId.startsWith('MOCK-') || !paypalClientId || !paypalClientSecret) {
      return res.status(200).json({
        success: true,
        status: 'COMPLETED',
        captureId: `MOCK-CAPTURE-${Date.now()}`,
        message: 'Mock PayPal order successfully captured for development'
      });
    }

    const accessToken = await getPayPalAccessToken();

    const response = await fetch(`${paypalBaseUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ success: false, error: data });
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('PayPal capture order error:', error);
    res.status(500).json({ success: false, message: error.message || 'PayPal capture failed' });
  }
};

/**
 * @desc    Handle PayPal Webhook notifications (Server-to-Server)
 * @route   POST /api/payment/paypal-webhook
 * @access  Public (Webhook verified)
 */
exports.handlePayPalWebhook = async (req, res) => {
  try {
    const headers = req.headers;
    const body = req.body;

    console.log(`🔔 [PayPal Webhook] Received event: ${body.event_type || 'Unknown'}`);

    const isTestBypass = (process.env.NODE_ENV !== 'production') && 
      (headers['x-paypal-test-bypass'] === 'true' || !paypalWebhookId);

    // If live credentials & webhook ID are configured, verify with PayPal API
    if (!isTestBypass && paypalWebhookId && paypalClientId && paypalClientSecret) {
      try {
        const accessToken = await getPayPalAccessToken();
        const verifyResponse = await fetch(`${paypalBaseUrl}/v1/notifications/verify-webhook-signature`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            auth_algo: headers['paypal-auth-algo'],
            cert_url: headers['paypal-cert-url'],
            transmission_id: headers['paypal-transmission-id'],
            transmission_sig: headers['paypal-transmission-sig'],
            transmission_time: headers['paypal-transmission-time'],
            webhook_id: paypalWebhookId,
            webhook_event: body
          })
        });

        const verifyData = await verifyResponse.json();
        if (verifyData.verification_status !== 'SUCCESS') {
          console.warn('⚠️ [PayPal Webhook] Signature verification failed');
          return res.status(400).json({ status: 'Invalid signature' });
        }
      } catch (verifyErr) {
        console.error('PayPal signature verification call error:', verifyErr);
        return res.status(400).json({ status: 'Signature verification error' });
      }
    }

    // Process event types
    const eventType = body.event_type;
    const resource = body.resource || {};

    switch (eventType) {
      case 'PAYMENT.CAPTURE.COMPLETED':
      case 'CHECKOUT.ORDER.APPROVED': {
        const orderId = resource.supplementary_data?.related_ids?.order_id || resource.id;
        const captureId = resource.id;
        console.log(`✅ [PayPal Webhook] Payment verified for PayPal Order ${orderId}`);

        // Update matching order in MongoDB
        if (orderId) {
          await Order.findOneAndUpdate(
            { paymentId: orderId },
            { 
              status: 'Paid', 
              paymentMethod: 'PAYPAL',
              paymentDetails: {
                captureId,
                paypalOrderId: orderId,
                amount: resource.amount,
                webhookReceivedAt: new Date()
              }
            }
          );
        }
        break;
      }

      case 'PAYMENT.CAPTURE.DENIED':
      case 'PAYMENT.CAPTURE.DECLINED': {
        const orderId = resource.id;
        console.log(`❌ [PayPal Webhook] Payment denied for PayPal Order ${orderId}`);
        if (orderId) {
          await Order.findOneAndUpdate(
            { paymentId: orderId },
            { status: 'Failed', paymentDetails: { resource, failedAt: new Date() } }
          );
        }
        break;
      }

      default:
        console.log(`ℹ️ [PayPal Webhook] Unhandled event type: ${eventType}`);
        break;
    }

    // PayPal expects a 200 OK
    res.status(200).json({ status: 'success', received: true });
  } catch (error) {
    console.error('PayPal webhook error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

/**
 * @desc    Programmatically register a webhook with PayPal API
 * @route   POST /api/payment/register-webhook/paypal
 * @access  Public
 */
exports.createPayPalWebhookApi = async (req, res) => {
  try {
    const {
      url = `${req.protocol}://${req.get('host')}/api/payment/paypal-webhook`,
      event_types = [
        { name: 'PAYMENT.CAPTURE.COMPLETED' },
        { name: 'CHECKOUT.ORDER.APPROVED' },
        { name: 'PAYMENT.CAPTURE.DENIED' }
      ]
    } = req.body;

    if (!isPayPalConfigured) {
      return res.status(400).json({
        success: false,
        message: 'PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET must be configured in .env'
      });
    }

    const accessToken = await getPayPalAccessToken();
    const response = await fetch(`${paypalBaseUrl}/v1/notifications/webhooks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
        event_types
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: 'PayPal error while creating webhook',
        error: data
      });
    }

    res.status(201).json({
      success: true,
      message: 'PayPal Webhook created successfully!',
      webhookId: data.id,
      webhook: data,
      hint: `Set PAYPAL_WEBHOOK_ID=${data.id} in your .env file`
    });
  } catch (error) {
    console.error('Create PayPal Webhook error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    List all registered webhooks from PayPal API
 * @route   GET /api/payment/webhooks/paypal
 */
exports.listPayPalWebhooksApi = async (req, res) => {
  try {
    if (!isPayPalConfigured) {
      return res.status(400).json({
        success: false,
        message: 'PayPal credentials not configured in .env'
      });
    }

    const accessToken = await getPayPalAccessToken();
    const response = await fetch(`${paypalBaseUrl}/v1/notifications/webhooks`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
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
