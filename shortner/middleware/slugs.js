const { nanoid } = require('nanoid');
const { Url } = require('../models');

exports.generateSlug = async (req, res, next) => {
    try {
        let slug = nanoid(8);

        // eslint-disable-next-line no-await-in-loop
        while ((await Url.findByPk(slug)) !== null) slug = nanoid(8);

        req.slug = slug;
        next();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error',
        });
    }
};

exports.getUrlBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const record = await Url.findByPk(slug);

        if (record != null) req.redirectUrl = record.fullUrl;

        next();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        return res.status(500).json({
            success: false,
        });
    }
};
