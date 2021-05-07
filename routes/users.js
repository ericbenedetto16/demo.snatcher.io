const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/users');
const { authenticateUser } = require('../middleware/auth');

router.route('/token').post(authenticateUser, (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'Token Valid',
    });
});

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

module.exports = router;
