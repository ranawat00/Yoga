const razorpayPaymentController = require('./razorpayPaymentController');
const paypalPaymentController = require('./paypalPaymentController');

module.exports = {
  ...razorpayPaymentController,
  ...paypalPaymentController
};
