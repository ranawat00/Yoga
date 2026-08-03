import { apiClient } from './client';

/**
 * Fetch all reviews for a specific workshop.
 * @param {string} workshopId - the unique ID of the workshop
 * @returns {Promise<object>} response data containing reviews
 */
export const fetchWorkshopReviews = (workshopId) => 
  apiClient(`/reviews/${workshopId}`);

/**
 * Submit a new review for a workshop.
 * @param {object} reviewData - { workshopId, name, rating, comment }
 * @returns {Promise<object>} response data containing the new review
 */
export const createWorkshopReview = (reviewData) => 
  apiClient('/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData)
  });
