const { Url, Tracker } = require('../models');

require('colors');

exports.saveSlug = async (req, res) => {
    try {
        const { url } = req.body;

        let obj;

        if (req.headers.user && req.headers.user !== null) {
            obj = await Url.create({
                slug: req.slug,
                fullUrl: url,
                userId: req.headers.user,
            });
        } else {
            obj = await Url.create({
                slug: req.slug,
                fullUrl: url,
            });
        }

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

exports.retrieveSlugsByUser = async (req, res) => {
    try {
        if (!req.headers.user) {
            return res.sendStatus(403);
        }

        const slugs = await Url.findAll({
            where: {
                userId: req.headers.user,
            },
        });

        res.status(200).json({
            success: true,
            slugs,
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`${err}`.red);

        res.status(500).json({ success: false, msg: 'Internal Server Error!' });
    }
};

exports.retrieveTrackersBySlug = async (req, res) => {
    try {
        if (!req.slug) {
            return res
                .status(404)
                .json({ success: false, msg: 'Requested Resource Not Found.' });
        }
        const trackers = await Tracker.findAll({
            where: {
                slug: req.slug,
            },
        });

        res.status(200).json({
            success: true,
            trackers,
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`${err}`.red);

        res.status(500).json({ success: false, msg: 'Internal Server Error!' });
    }
};
