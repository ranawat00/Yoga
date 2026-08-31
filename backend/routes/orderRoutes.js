const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getMyOrders } = require('../controllers/order');
const { protect } = require('../middleware/authMiddleware');

// Define routes
router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/my-orders', protect, getMyOrders);

module.exports = router;
