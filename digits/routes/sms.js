const router = require('express').Router();
const { sendSMS } = require('../controllers/twilio');
const { formatRecipient, injectLink } = require('../middleware/sms');

router.route('/sendSms').post(formatRecipient, injectLink, sendSMS);

module.exports = router;
