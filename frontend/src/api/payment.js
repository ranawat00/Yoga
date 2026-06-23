import { apiClient } from './client';

/**
 * Create a new payment order.
 * @param {number} amount - Amount in INR
 * @returns {Promise<object>} response order data
 */
export const createOrder = (amount) => 
  apiClient('/payment/create-order', {
    method: 'POST',
    body: JSON.stringify({ amount })
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
