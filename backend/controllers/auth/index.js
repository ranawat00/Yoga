const userAuthController = require('./userAuthController');
const socialAuthController = require('./socialAuthController');

module.exports = {
  ...userAuthController,
  ...socialAuthController
};
