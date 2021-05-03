const router = require('express').Router();
const vhost = require('vhost');

// Import Routes
const slugs = require('./slugs');
const users = require('./users');
const payments = require('./payments');

router.use('/users', vhost('gateway.snatcher.link', users));

// Gateway Services
router.use('/payments', vhost('gateway.snatcher.link', payments));

router.use(vhost('gateway.snatcher.link', slugs));

router.post('/createLink', vhost('gateway.snatcher.link', slugs));

// TODO: Change Construction of this Vhost to a Util Function
const hostMatcher = /cmprsd\.link|minified\.live|shrinkd\.xyz|shrtnd\.xyz|shrtnr\.io|tinyd\.live/;
router.get('/:slugs', vhost(hostMatcher, slugs));

module.exports = router;
