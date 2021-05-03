const fetch = require('node-fetch');
const { Tracker } = require('../models');

// We Do Not Want to Throw Errors Here, Because It Will Prevent a Re-Direct of the User
exports.trackUser = async (req, res, next) => {
    // TODO: Implement Proxy/VPN Hiding to Add Warning to User
    // TODO: Implement User-Agent/Device-Type Tracking
    try {
        if (!req.redirectUrl) return next(); // Invalid Slug, Skip Tracking

        // eslint-disable-next-line operator-linebreak
        const ip =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        const ipRes = await fetch(
            `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_GEOLOCATION_API_KEY}&ip=${ip}`
        );

        const ipData = await ipRes.json();

        if (!ipData.error) {
            await Tracker.create({
                slug: req.params.slug,
                ip,
                dateAccessed: new Date(Date.now()).toISOString(),
                country: ipData.country_name,
                city: ipData.city,
                region: ipData.state_prov,
                postal: ipData.zipcode,
                latitude: ipData.latitude,
                longitude: ipData.longitude,
            });
        } else {
            // eslint-disable-next-line no-console
            console.log(`Error Fetching IP Data: ${ipData.reason}`);
        }

        next();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        next();
    }
};
