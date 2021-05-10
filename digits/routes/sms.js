const router = require('express').Router();
const { sendSMS } = require('../controllers/twilio');
const { formatRecipient } = require('../middleware/sms');

router.route('/sendSms').post(formatRecipient, sendSMS);

module.exports = router;
