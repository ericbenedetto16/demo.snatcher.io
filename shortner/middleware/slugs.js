const { nanoid } = require('nanoid');
const { Url } = require('../models');

exports.generateSlug = async (req, res, next) => {
    let slug = nanoid(8);

    while ((await Url.findByPk(slug)) != null) slug = generateSlug();

    req.slug = slug;
    next();
};

exports.getUrlBySlug = async (req, res, next) => {
    let { slug } = req.params;

    const record = await Url.findByPk(slug);

    if (record != null) req.redirectUrl = record.fullUrl;

    next();
};
