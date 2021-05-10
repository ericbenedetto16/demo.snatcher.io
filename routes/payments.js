const router = require('express').Router();
const { authenticateUser, authorizeUser } = require('../middleware/auth');
const { forwardToPaymentService } = require('../controllers/payments');

router
    .route('/create')
    .post(authenticateUser, authorizeUser, forwardToPaymentService);

router
    .route('/authorize')
    .post(authenticateUser, authorizeUser, forwardToPaymentService);

module.exports = router;
