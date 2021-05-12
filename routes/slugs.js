const router = require('express').Router();
const slowDown = require('express-slow-down');
const rateLimit = require('express-rate-limit');
const {
    setAuthOptional,
    authenticateUser,
    authorizeUser,
} = require('../middleware/auth');
const { forwardToSlugService } = require('../controllers/slugs');

router.route('/:slugs').get(forwardToSlugService);
router.route('/createLink').post(
    slowDown({
        windowMs: 15 * 1000,
        delayAfter: 1,
        delayMs: 1000,
    }),
    rateLimit({ windowMs: 15 * 1000, max: 1 }),
    setAuthOptional,
    authenticateUser,
    authorizeUser,
    forwardToSlugService
);

router.route('/track/:slug').get(forwardToSlugService);
router
    .route('/getSlugs')
    .post(authenticateUser, authorizeUser, forwardToSlugService);

module.exports = router;
