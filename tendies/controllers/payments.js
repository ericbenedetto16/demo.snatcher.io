const fetch = require('node-fetch');
const {
    PAYPAL_ORDER_API,
    PAYPAL_AUTHORIZATION_API,
} = require('../utils/constants');
const { Order } = require('../models');

exports.createOrder = async (req, res) => {
    try {
        const { slug, recipient, msgBody } = req.body;
        let order = await fetch(PAYPAL_ORDER_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${req.auth.access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                intent: 'AUTHORIZE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: '1.00',
                        },
                    },
                ],
            }),
        });

        order = await order.json();

        if (order.error) {
            // eslint-disable-next-line no-console
            console.log(order.error);
            return res.status(500).json({
                success: false,
                msg: 'Paypal Error',
            });
        }

        // Save New Order in Database
        await Order.create({
            userId: req.user,
            slug: slug.replace(/http[s]?:\/\/[a-zA-Z]*\.[a-zA-Z]*\//, ''),
            recipient,
            msgBody,
            paypalOrderId: order.id,
        });

        res.status(200).json({
            success: true,
            orderID: order.id,
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

exports.voidAuthorization = async (req, res) => {
    try {
        const { authorizationID } = req;

        const capture = await fetch(
            `${PAYPAL_AUTHORIZATION_API}${authorizationID}/void`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${req.auth.access_token}`,
                },
            }
        );

        if (capture.status !== 204) throw new Error('Paypal Error');

        // Void the Order in the Database
        await Order.update(
            {
                void: true,
            },
            { where: { paypalAuthorizationId: authorizationID } }
        );

        res.status(500).json({
            success: true,
            msg: 'Transaction Aborted Due to Server Error, Payment Voided',
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

exports.captureAuthorization = async (req, res) => {
    try {
        const { authorizationID } = req;

        let capture = await fetch(
            `${PAYPAL_AUTHORIZATION_API}${authorizationID}/capture`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${req.auth.access_token}`,
                },
            }
        );

        capture = await capture.json();

        if (capture.error) {
            // eslint-disable-next-line no-console
            console.log(capture.error);
            return res.status(500).json({
                success: false,
                msg: 'Paypal Error',
            });
        }

        const captureID = capture.id;

        // Mark Order as Paid
        await Order.update(
            {
                paypalCaptureId: captureID,
            },
            { where: { paypalAuthorizationId: authorizationID } }
        );

        res.status(200).json({
            success: true,
            msg: 'Transaction Captured Successfully',
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
