const analyticsController = require('./analyticsController');
const orderDashboardController = require('./orderDashboardController');
const registrationDashboardController = require('./registrationDashboardController');
const userDashboardController = require('./userDashboardController');
const workshopDashboardController = require('./workshopDashboardController');

module.exports = {
  ...analyticsController,
  ...orderDashboardController,
  ...registrationDashboardController,
  ...userDashboardController,
  ...workshopDashboardController
};
