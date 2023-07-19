const paypal = require('paypal-rest-sdk');
require('dotenv').config()


paypal.configure({
  mode: 'sandbox', // Use 'sandbox' for testing; 'live' for production
  client_id: process.env.PAYPAL_CLIEND_ID,
  client_secret:process.env.PAYPAL_SECRET_KEY,
});


module.exports = paypal