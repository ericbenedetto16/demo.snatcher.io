const router = require('express').Router();
const { createOrder, captureTransaction } = require('../controllers/payments');
const { validateUser } = require('../middleware/auth');
const { getAccessToken } = require('../middleware/paypal');

router.route('/create').post(validateUser, getAccessToken, createOrder);

router.route('/capture').post(validateUser, getAccessToken, captureTransaction);

module.exports = router;
