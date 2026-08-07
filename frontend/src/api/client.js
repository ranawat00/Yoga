import { store } from '../redux/store';
import { logoutUser } from '../redux/slices/authSlice';
import { addNotification } from '../redux/slices/uiSlice';

const BASE_URL = 'http://localhost:5000/api';

let isRefreshing = false;

/**
 * Base HTTP client wrapper using Fetch API.
 * Automatically attaches Authorization headers and JSON Content-Type.
 * Intercepts 401 response status to perform silent token refreshing.
 * @param {string} endpoint - API path (e.g. '/auth/login')
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<any>} Response JSON data
 */
export const apiClient = async (endpoint, options = {}) => {
  let token = localStorage.getItem('token');
  const method = options.method || 'GET';
  const isGet = method.toUpperCase() === 'GET';
  const headers = {
    ...(!isGet && { 'Content-Type': 'application/json' }),
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  let res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: 'include',
    ...options,
    headers
  });

  // Intercept 401 Unauthorized status (access token expired)
  if (
    res.status === 401 && 
    !isRefreshing && 
    endpoint !== '/auth/refresh-token' && 
    endpoint !== '/auth/login' && 
    endpoint !== '/auth/signup'
  ) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      isRefreshing = true;
      try {
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken })
        });
        const refreshData = await refreshRes.json();

        if (refreshRes.ok && refreshData.success) {
          localStorage.setItem('token', refreshData.token);
          localStorage.setItem('refreshToken', refreshData.refreshToken);

          // Retry the original request with the new access token
          const retryHeaders = {
            ...headers,
            'Authorization': `Bearer ${refreshData.token}`
          };
          res = await fetch(`${BASE_URL}${endpoint}`, {
            credentials: 'include',
            ...options,
            headers: retryHeaders
          });
        } else {
          // Refresh token has also expired or is invalid (e.g. after 2-3 days)
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          store.dispatch(logoutUser());
          store.dispatch(addNotification({ message: 'Session expired. Please log in again.', type: 'error' }));
        }
      } catch (err) {
        console.error('Error refreshing token:', err);
      } finally {
        isRefreshing = false;
      }
    }
  }

  return res.json();
};

