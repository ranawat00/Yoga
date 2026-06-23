const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Define routes
router.post('/', createOrder);
router.get('/my-orders', protect, getMyOrders);

module.exports = router;
