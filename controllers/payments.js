const httpProxy = require('express-http-proxy');

const paymentServiceProxy = httpProxy(process.env.PAYMENT_SERVICE_URL);

exports.forwardToPaymentService = async (req, res, next) => {
    try {
        paymentServiceProxy(req, res, next);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`${err}`.red);

        res.status(500).json({
            success: false,
            msg: 'Internal Server Error!',
        });
    }
};
