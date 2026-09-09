import { apiClient } from './client';

/**
 * Create a new payment order.
 * @param {number} amount - Amount in INR
 * @returns {Promise<object>} response order data
 */
export const createOrder = (amount, currency = 'INR') => 
  apiClient('/payment/create-order', {
    method: 'POST',
    body: JSON.stringify({ amount, currency })
  });

/**
 * Verify order payment signature.
 * @param {object} paymentDetails - { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 * @returns {Promise<object>} response verification status
 */
export const verifyPayment = (paymentDetails) => 
  apiClient('/payment/verify-payment', {
    method: 'POST',
    body: JSON.stringify(paymentDetails)
  });

/**
 * Create a new PayPal payment order.
 * @param {number} amount - Amount in USD
 * @param {string} currency - Currency code (e.g. 'USD')
 * @returns {Promise<object>} response order data
 */
export const createPayPalOrder = (amount, currency = 'USD') =>
  apiClient('/payment/paypal/create-order', {
    method: 'POST',
    body: JSON.stringify({ amount, currency })
  });

/**
 * Capture a PayPal order by ID.
 * @param {string} orderId - PayPal Order ID
 * @returns {Promise<object>} response capture result
 */
export const capturePayPalOrder = (orderId) =>
  apiClient('/payment/paypal/capture-order', {
    method: 'POST',
    body: JSON.stringify({ orderId })
  });

/**
 * Check status of a PayPal order by ID.
 * @param {string} orderId - PayPal Order ID
 * @returns {Promise<object>} response order status
 */
export const checkPayPalOrderStatus = (orderId) =>
  apiClient(`/payment/paypal/order-status/${orderId}`, {
    method: 'GET'
  });

