const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication
} = require('../controllers/internship');

// @route   POST /api/internships/apply
// @desc    Submit a new internship application with resume base64
// @access  Public
router.post('/apply', submitApplication);

// @route   GET /api/internships
// @desc    Get all internship applications for Admin Dashboard
// @access  Public / Admin
router.get('/', getApplications);

// @route   PATCH /api/internships/:id/status
// @desc    Update internship application status
// @access  Admin
router.patch('/:id/status', updateApplicationStatus);

// @route   DELETE /api/internships/:id
// @desc    Delete an internship application
// @access  Admin
router.delete('/:id', deleteApplication);

module.exports = router;
