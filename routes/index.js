const router = require('express').Router();

// Import Routes
const slugs = require('./slugs');
const users = require('./users');
const payments = require('./payments');

router.use('/users', users);

// Gateway Services
router.use('/payments', payments);

router.post('/createLink', slugs);
router.get('/:slugs', slugs);
router.get('/track/:slug', slugs);
router.post('/getSlugs', slugs);

module.exports = router;
