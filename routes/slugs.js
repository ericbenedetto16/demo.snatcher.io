const router = require('express').Router();
const {
    setAuthOptional,
    authenticateUser,
    authorizeUser,
} = require('../middleware/auth');
const { forwardToSlugService } = require('../controllers/slugs');

router.route('/:slugs').get(forwardToSlugService);
router
    .route('/createLink')
    .post(
        setAuthOptional,
        authenticateUser,
        authorizeUser,
        forwardToSlugService
    );

module.exports = router;
