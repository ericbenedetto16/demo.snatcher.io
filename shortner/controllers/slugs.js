const { Url } = require('../models');

require('colors');

exports.saveSlug = async (req, res) => {
    try {
        const { url } = req.body;

        const obj = await Url.create({
            slug: req.slug,
            fullUrl: url,
        });

        res.status(200).json({
            success: true,
            slug: obj.slug,
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`${err}`.red);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error!',
        });
    }
};

exports.redirectUserBySlug = async (req, res) => {
    try {
        if (!req.redirectUrl) {
            res.status(404);
            // TODO: Edit Template Styling to Match Front-End
            res.render('404', { title: 'Snatcher - Not Found' });
            return;
        }

        res.redirect(req.redirectUrl);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`${err}`.red);

        res.status(500).json({ success: false, msg: 'Internal Server Error!' });
    }
};
