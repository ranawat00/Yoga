import { apiClient } from './client';

/**
 * Searches institutions by name
 * @param {string} query The search string
 * @returns {Promise<Array>} Array of institution objects
 */
export const searchInstitutionsAPI = async (query) => {
  try {
    const response = await apiClient(`/institutions/search?q=${encodeURIComponent(query)}`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching institutions:', error);
    return []; // Return empty array on error so UI doesn't crash
  }
};
