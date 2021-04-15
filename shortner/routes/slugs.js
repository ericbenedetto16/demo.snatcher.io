const router = require('express').Router();
const { generateSlug, getUrlBySlug } = require('../middleware/slugs');
const { saveSlug, redirectUserBySlug } = require('../controllers/slugs');

router.route('/createLink').post(generateSlug, saveSlug);

router.route('/:slug').get(getUrlBySlug, redirectUserBySlug);

module.exports = router;
