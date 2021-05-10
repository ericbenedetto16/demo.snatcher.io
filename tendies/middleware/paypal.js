const fetch = require('node-fetch');
const {
    PAYPAL_CLIENT,
    PAYPAL_SECRET,
    PAYPAL_OAUTH_API,
    PAYPAL_ORDER_API,
} = require('../utils/constants');
const { Order } = require('../models');

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

exports.authorizeOrder = async (req, res, next) => {
    try {
        const { orderID } = req.body;
        let authorization = await fetch(
            `${PAYPAL_ORDER_API}${orderID}/authorize`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${req.auth.access_token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        authorization = await authorization.json();

        if (!authorization.error) {
            // eslint-disable-next-line operator-linebreak
            const authorizationID =
                authorization.purchase_units[0].payments.authorizations[0].id;

            req.authorizationID = authorizationID;

            // Assign Order Authorization ID
            await Order.update(
                {
                    paypalAuthorizationId: authorizationID,
                },
                {
                    where: {
                        paypalOrderId: orderID,
                    },
                }
            );
        }

        if (authorization.error) {
            // eslint-disable-next-line no-console
            console.log(authorization.error);
            return res.status(500).json({
                success: false,
                msg: 'Paypal Error',
            });
        }

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
