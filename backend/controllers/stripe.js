const config = require('../config/stripe');
const stripe = require('stripe')(config.stripeSecretKey);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 100;
};

const createPaymentIntent = async (req, res, next) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = {
  createPaymentIntent,
};
