const fetch = require('node-fetch');
const { voidAuthorization } = require('../controllers/payments');

exports.sendSMS = async (req, res, next) => {
    try {
        const smsRes = await fetch(
            `http://${process.env.SNATCHER_DIGITS_SERVICE_HOST}/sendSMS`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body),
            }
        );

        if ((await smsRes.json()).success === false) {
            return voidAuthorization(req, res, next);
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
