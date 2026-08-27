const express = require('express');
const router = express.Router();
const {
  createContactSubmission,
  getContactSubmissions,
  updateContactStatus,
  deleteContactSubmission
} = require('../controllers/contactController');

router.route('/')
  .post(createContactSubmission)
  .get(getContactSubmissions);

router.put('/:id/status', updateContactStatus);
router.delete('/:id', deleteContactSubmission);

module.exports = router;
