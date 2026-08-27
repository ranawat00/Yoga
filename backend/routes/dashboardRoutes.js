const express = require('express');
const router = express.Router();
const { 
  getDashboardOverview,
  getDashboardOrders,
  getDashboardRegistrations,
  getDashboardUsers,
  getDashboardWorkshops
} = require('../controllers/dashboardController');
const { getCoupons } = require('../controllers/couponController');
const { getContactSubmissions } = require('../controllers/contactController');

// Master Board Analytics Overview
router.get('/overview', getDashboardOverview);

// Management Tab Data Endpoints
router.get('/orders', getDashboardOrders);
router.get('/registrations', getDashboardRegistrations);
router.get('/users', getDashboardUsers);
router.get('/workshops', getDashboardWorkshops);
router.get('/coupons', getCoupons);
router.get('/inquiries', getContactSubmissions);

module.exports = router;
