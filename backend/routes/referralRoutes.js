const express = require('express');
const router = express.Router();
const {
  getReferralCodes,
  createReferralCode,
  toggleReferralStatus,
  deleteReferralCode,
  validateReferralCode
} = require('../controllers/referral');

// Public validation endpoint for student sign-up
router.post('/validate', validateReferralCode);

// Admin Management routes
router.get('/', getReferralCodes);
router.post('/', createReferralCode);
router.put('/:id/toggle', toggleReferralStatus);
router.delete('/:id', deleteReferralCode);

module.exports = router;
