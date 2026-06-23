import { apiClient } from './client';

/**
 * Place a new order in the database.
 * @param {object} orderData - full shipping, items, and payment details
 * @returns {Promise<object>} response order placement data
 */
export const createOrderRecord = (orderData) => 
  apiClient('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });

/**
 * Get current logged in user's order history.
 * @returns {Promise<object>} response user orders
 */
export const fetchMyOrders = () => 
  apiClient('/orders/my-orders');
