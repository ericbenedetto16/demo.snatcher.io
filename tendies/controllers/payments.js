const fetch = require('node-fetch');
const { PAYPAL_ORDER_API } = require('../utils/constants');

exports.createOrder = async (req, res) => {
    try {
        let order = await fetch(PAYPAL_ORDER_API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${req.auth.access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
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

exports.captureTransaction = async (req, res) => {
    try {
        const { orderID } = req.body;

        let capture = await fetch(`${PAYPAL_ORDER_API}${orderID}/capture`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${req.auth.access_token}`,
            },
        });

        capture = await capture.json();

        // TODO: Implement Database Stuff
        // if (!capture.error) {
        //     captureID = capture.purchase_units[0].payments.captures[0].id;
        //     database.saveCaptureID(captureID);
        // }

        if (capture.error) {
            // eslint-disable-next-line no-console
            console.log(capture.error);
            return res.status(500).json({
                success: false,
                msg: 'Paypal Error',
            });
        }

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
