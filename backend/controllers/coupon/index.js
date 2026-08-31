const couponValidationController = require('./couponValidationController');
const couponManagementController = require('./couponManagementController');

module.exports = {
  ...couponValidationController,
  ...couponManagementController
};
