const orderCheckoutController = require('./orderCheckoutController');
const orderQueryController = require('./orderQueryController');

module.exports = {
  ...orderCheckoutController,
  ...orderQueryController
};
