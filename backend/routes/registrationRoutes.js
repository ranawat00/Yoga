const express = require('express');
const router = express.Router();
const {
  createRegistration,
  getRegistrations,
  deleteRegistration
} = require('../controllers/registrationController');

router.route('/')
  .post(createRegistration)
  .get(getRegistrations);

router.route('/:id')
  .delete(deleteRegistration);

module.exports = router;
