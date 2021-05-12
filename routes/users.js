const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const { registerUser, loginUser } = require('../controllers/users');
const { authenticateUser } = require('../middleware/auth');

router.route('/token').post(authenticateUser, (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'Token Valid',
    });
});

router.route('/register').post(
    slowDown({
        windowMs: 10 * 1000,
        delayAfter: 1,
        delayMs: 1000,
    }),
    rateLimit({ windowMs: 10 * 1000, max: 1 }),
    registerUser
);

router.route('/login').post(
    slowDown({
        windowMs: 15 * 1000,
        delayAfter: 2,
        delayMs: 1000,
    }),
    rateLimit({ windowMs: 15 * 1000, max: 2 }),
    loginUser
);

module.exports = router;
