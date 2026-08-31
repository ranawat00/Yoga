const express = require('express');
const router = express.Router();
const { logPageView, getTrafficStats } = require('../controllers/traffic');

router.post('/log', logPageView);
router.get('/stats', getTrafficStats);

module.exports = router;
