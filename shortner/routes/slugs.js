const router = require('express').Router();
const {
    generateSlug,
    getUrlBySlug,
    validateSlug,
} = require('../middleware/slugs');
const {
    saveSlug,
    redirectUserBySlug,
    retrieveSlugsByUser,
    retrieveTrackersBySlug,
} = require('../controllers/slugs');
const { trackUser } = require('../middleware/tracking');

router.route('/createLink').post(generateSlug, saveSlug);

router.route('/:slug').get(getUrlBySlug, trackUser, redirectUserBySlug);

router.route('/track/:slug').get(validateSlug, retrieveTrackersBySlug);

router.route('/getSlugs').post(retrieveSlugsByUser);

module.exports = router;
