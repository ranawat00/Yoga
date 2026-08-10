import { apiClient } from './client';

/**
 * Fetch current user context using the bearer token.
 * @param {string} [token] - Optional token override
 * @returns {Promise<object>} response data
 */
export const fetchMe = (token) => 
  apiClient('/auth/me', {
    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
  });

/**
 * Log in a user with email and password.
 * @param {string} email 
 * @param {string} password 
 * @param {string} [role]
 * @param {string} [studentId]
 * @returns {Promise<object>} response data
 */
export const login = (email, password, role, studentId) => 
  apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, role, studentId })
  });

/**
 * Sign up a new user.
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @param {string} [role]
 * @param {string} [schoolName]
 * @param {string} [studentId]
 * @returns {Promise<object>} response data
 */
export const signup = (name, email, password, role, schoolName, studentId) => 
  apiClient('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role, schoolName, studentId })
  });

/**
 * Log out the current user.
 * @param {string} [refreshToken] - Optional refresh token to revoke on the server
 * @returns {Promise<object>} response data
 */
export const logout = (refreshToken) => 
  apiClient('/auth/logout', { 
    method: 'POST',
    body: refreshToken ? JSON.stringify({ refreshToken }) : undefined
  });

/**
 * Log out of all active devices / revoke all sessions.
 * @returns {Promise<object>} response data
 */
export const logoutAllDevices = () =>
  apiClient('/auth/logout-all', {
    method: 'POST'
  });

/**
 * Request a password reset email.
 * @param {string} email 
 * @returns {Promise<object>} response data
 */
export const forgotPassword = (email) => 
  apiClient('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email })
  });

/**
 * Update user details (name and email).
 * @param {string} name 
 * @param {string} email 
 * @returns {Promise<object>} response data
 */
export const updateDetails = (name, email) =>
  apiClient('/auth/updatedetails', {
    method: 'PUT',
    body: JSON.stringify({ name, email })
  });
