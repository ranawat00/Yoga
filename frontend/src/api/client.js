const BASE_URL = 'http://localhost:5000/api';

/**
 * Base HTTP client wrapper using Fetch API.
 * Automatically attaches Authorization headers and JSON Content-Type.
 * @param {string} endpoint - API path (e.g. '/auth/login')
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<any>} Response JSON data
 */
export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });
  return res.json();
};
