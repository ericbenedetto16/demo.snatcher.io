const router = require('express').Router();
const { authenticateUser, authorizeUser } = require('../middleware/auth');
const { forwardToSlugService } = require('../controllers/slugs');

router.route('/:slugs').get(forwardToSlugService);
router
    .route('/createLink')
    .post(authenticateUser, authorizeUser, forwardToSlugService);

module.exports = router;
