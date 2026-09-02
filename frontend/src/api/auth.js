import { apiClient } from './client';

/**
 * Fetch current authenticated user context.
 * @param {string} [token] - Optional Bearer token override
 * @returns {Promise<object>}
 */
export const fetchMe = (token) => 
  apiClient('/auth/me', {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

/**
 * Authenticate user with credentials.
 * Accepts either a structured payload object or positional arguments.
 * @param {Object|string} credentials - Credentials object { email, password, role } or email string
 * @param {string} [password] 
 * @param {string} [role] 
 * @returns {Promise<object>}
 */
export const login = (credentials, password, role) => {
  const payload = typeof credentials === 'object' && credentials !== null
    ? credentials 
    : { email: credentials, password, role };

  return apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
};

/**
 * Register a new user account.
 * Accepts either a single structured payload object or legacy positional arguments.
 * @param {Object|string} data - User data object or name string
 * @returns {Promise<object>}
 */
export const signup = (data, email, password, role, schoolName, studentId, referralId, studentName, phone) => {
  const payload = typeof data === 'object' && data !== null
    ? data
    : { name: data, email, password, role, schoolName, studentId, referralId, studentName, phone };

  return apiClient('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
};

/**
 * Log out user and invalidate refresh token session.
 * @param {string} [refreshToken] 
 * @returns {Promise<object>}
 */
export const logout = (refreshToken) => 
  apiClient('/auth/logout', { 
    method: 'POST',
    body: refreshToken ? JSON.stringify({ refreshToken }) : undefined
  });

/**
 * Revoke all active sessions across devices.
 * @returns {Promise<object>}
 */
export const logoutAllDevices = () =>
  apiClient('/auth/logout-all', {
    method: 'POST'
  });

/**
 * Initiate password reset workflow.
 * @param {string} email 
 * @returns {Promise<object>}
 */
export const forgotPassword = (email) => 
  apiClient('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email: String(email || '').trim().toLowerCase() })
  });

/**
 * Update user profile details.
 * @param {Object|string} details - Profile object { name, email } or name string
 * @param {string} [email]
 * @returns {Promise<object>}
 */
export const updateDetails = (details, email) => {
  const payload = typeof details === 'object' && details !== null
    ? details
    : { name: details, email };

  return apiClient('/auth/updatedetails', {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
};

/**
 * Authenticate with OAuth Provider (Google, Facebook, Apple)
 * @param {Object} payload 
 */
export const googleAuth = (payload) =>
  apiClient('/auth/google', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const facebookAuth = (payload) =>
  apiClient('/auth/facebook', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const appleAuth = (payload) =>
  apiClient('/auth/apple', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

/**
 * Validate student invite/referral code.
 * @param {string} referralId 
 * @returns {Promise<object>}
 */
export const validateReferral = (referralId) =>
  apiClient('/referrals/validate', {
    method: 'POST',
    body: JSON.stringify({ referralId: String(referralId || '').trim().toUpperCase() })
  });

