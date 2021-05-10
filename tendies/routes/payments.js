const router = require('express').Router();
const {
    createOrder,
    captureAuthorization,
} = require('../controllers/payments');
const { validateUser } = require('../middleware/auth');
const { getAccessToken, authorizeOrder } = require('../middleware/paypal');
const { sendSMS } = require('../middleware/sms');

router.route('/create').post(validateUser, getAccessToken, createOrder);

router
    .route('/authorize')
    .post(
        validateUser,
        getAccessToken,
        authorizeOrder,
        sendSMS,
        captureAuthorization
    );

module.exports = router;
