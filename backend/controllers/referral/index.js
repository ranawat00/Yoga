const referralValidationController = require('./referralValidationController');
const referralManagementController = require('./referralManagementController');

module.exports = {
  ...referralValidationController,
  ...referralManagementController
};
