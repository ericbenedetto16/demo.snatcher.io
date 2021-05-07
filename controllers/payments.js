const httpProxy = require('express-http-proxy');

const paymentServiceProxy = httpProxy(
    process.env.SNATCHER_TENDIES_SERVICE_HOST,
    {
        proxyReqOptDecorator: (newReq, oldReq) => {
            // eslint-disable-next-line no-param-reassign
            newReq.headers.user = oldReq.user.id;

            return newReq;
        },
    }
);

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
