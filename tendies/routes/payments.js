const router = require('express').Router();
const { createOrder, captureTransaction } = require('../controllers/payments');
const { getAccessToken } = require('../middleware/paypal');

router.route('/create').post(getAccessToken, createOrder);

router.route('/capture').post(getAccessToken, captureTransaction);

module.exports = router;
