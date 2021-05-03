const httpProxy = require('express-http-proxy');

const slugServiceProxy = httpProxy(process.env.SNATCHER_SHORTNER_SERVICE_HOST);

exports.forwardToSlugService = async (req, res, next) => {
    try {
        slugServiceProxy(req, res, next);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`${err}`.red);

        res.status(500).json({
            success: false,
            msg: 'Internal Server Error!',
        });
    }
};
