const express = require('express');
const router = express.Router();
// const checkAuth = require('../middleware/auth-token');
const { createPaymentIntent } = require('../controllers/stripe');

// router.use(checkAuth);

router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;
