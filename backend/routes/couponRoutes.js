const express = require('express');
const router = express.Router();
const {
  getCoupons,
  createCoupon,
  updateCoupon,
  toggleCouponStatus,
  deleteCoupon,
  validateCoupon
} = require('../controllers/coupon');

// Public validation endpoint for workshop checkout
router.post('/validate', validateCoupon);

// Admin Coupon Management routes
router.get('/', getCoupons);
router.post('/', createCoupon);
router.put('/:id', updateCoupon);
router.put('/:id/toggle', toggleCouponStatus);
router.delete('/:id', deleteCoupon);

module.exports = router;
