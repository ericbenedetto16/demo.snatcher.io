const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { User } = require('../models');

exports.registerUser = async (req, res, next) => {
    try {
        // eslint-disable-next-line object-curly-newline
        const { firstName, lastName, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const pwd = await bcrypt.hash(password, salt);

        await User.create({
            firstName,
            lastName,
            email,
            password: pwd,
            role: 'general', // Default User Will Be
        });

        res.status(200).json({
            success: true,
            msg: 'Registration Successful',
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        res.status(500).json({
            success: false,
            msg: 'Internal Server Error',
        });
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password || username === '' || password === '') {
            return res
                .status(403)
                .json({ success: false, msg: 'Invalid Username or Password' });
        }

        const user = await User.findOne({
            where: {
                email: username,
            },
        });

        if (!user) {
            return res
                .status(403)
                .json({ success: false, msg: 'Invalid Username or Password' });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res
                .status(403)
                .json({ success: false, msg: 'Invalid Username or Password' });
        }

        const token = jsonwebtoken.sign(
            {
                sub: user.email,
                iat: Math.floor(Date.now() / 1000),
            },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: '12h' }
        );

        res.status(200).json({
            success: true,
            token,
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        res.status(500).json({
            success: false,
            msg: 'Internal Server Error',
        });
    }
};
