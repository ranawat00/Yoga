const express = require('express');
const router = express.Router();
const { getReviews, createReview } = require('../controllers/reviewController');

router.route('/')
  .post(createReview);

router.route('/:workshopId')
  .get(getReviews);

module.exports = router;
