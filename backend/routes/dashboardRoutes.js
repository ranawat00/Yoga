const express = require('express');
const router = express.Router();
const { 
  getDashboardOverview,
  getDashboardOrders,
  getDashboardRegistrations,
  getDashboardUsers,
  getDashboardWorkshops
} = require('../controllers/dashboard');
const { getCoupons } = require('../controllers/coupon');
const { getReferralCodes } = require('../controllers/referral');
const { getContactSubmissions } = require('../controllers/contact');
const { getApplications } = require('../controllers/internship');

// Master Board Analytics Overview
router.get('/overview', getDashboardOverview);

// Management Tab Data Endpoints
router.get('/orders', getDashboardOrders);
router.get('/registrations', getDashboardRegistrations);
router.get('/users', getDashboardUsers);
router.get('/workshops', getDashboardWorkshops);
router.get('/coupons', getCoupons);
router.get('/referrals', getReferralCodes);
router.get('/inquiries', getContactSubmissions);
router.get('/internships', getApplications);

module.exports = router;
