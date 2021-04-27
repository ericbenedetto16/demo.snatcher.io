const fetch = require('node-fetch');
const {
    PAYPAL_CLIENT,
    PAYPAL_SECRET,
    PAYPAL_OAUTH_API,
} = require('../utils/constants');

exports.getAccessToken = async (req, res, next) => {
    try {
        const base64PaypalAuth = Buffer.from(
            `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`
        ).toString('base64');

        const auth = await fetch(PAYPAL_OAUTH_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${base64PaypalAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        });

        req.auth = await auth.json();

        next();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error',
        });
    }
};
