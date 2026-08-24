import { apiClient } from './client';

/**
 * Submit a new workshop / free registration to store details in MongoDB
 * @param {object} registrationData - name, phone, email, batch, etc.
 * @returns {Promise<object>} API response JSON
 */
export const submitRegistration = (registrationData) =>
  apiClient('/registrations', {
    method: 'POST',
    body: JSON.stringify(registrationData)
  });

/**
 * Fetch all registrations from DB
 * @returns {Promise<object>} API response JSON
 */
export const fetchRegistrations = () =>
  apiClient('/registrations');
