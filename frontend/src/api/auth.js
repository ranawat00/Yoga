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
 * @returns {Promise<object>} response data
 */
export const login = (email, password) => 
  apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

/**
 * Sign up a new user.
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} response data
 */
export const signup = (name, email, password) => 
  apiClient('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  });

/**
 * Log out the current user.
 * @returns {Promise<object>} response data
 */
export const logout = () => 
  apiClient('/auth/logout', { 
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
