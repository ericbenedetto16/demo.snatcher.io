const router = require('express').Router();
const { generateSlug, getUrlBySlug } = require('../middleware/slugs');
const { saveSlug, redirectUserBySlug } = require('../controllers/slugs');
const { trackUser } = require('../middleware/tracking');

router.route('/createLink').post(generateSlug, saveSlug);

router.route('/:slug').get(getUrlBySlug, trackUser, redirectUserBySlug);

module.exports = router;
