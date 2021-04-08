const router = require('express').Router();

const { forwardToSlugService } = require('../controllers/slugs');
const { authenticateUser, authorizeUser } = require('../middleware/auth');

router.route('/:slugs').get(forwardToSlugService);
router
    .route('/createLink')
    .post(authenticateUser, authorizeUser, forwardToSlugService);

module.exports = router;
