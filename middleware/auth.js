const passport = require('passport');

exports.authenticateUser = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.log(err);
            return res.sendStatus(401);
        }

        if (!user) return res.sendStatus(403);

        req.user = user;

        next();
    })(req, res, next);
};

exports.authorizeUser = async (req, res, next) => {
    try {
        if (!req.user) res.sendStatus(401);
        // TODO: Add All Protected Routes and Their Roles in Here
        const protectedRoutes = new Map([
            ['/slugs/disable', new Set(['admin'])],
        ]);

        if (
            // eslint-disable-next-line operator-linebreak
            protectedRoutes.has(req.path) &&
            protectedRoutes.get(req.path).has(req.user.role)
        ) {
            return next();
        }

        res.sendStatus(403);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`${err}`.red);
        res.status(500).json({ success: false, msg: 'Internal Server Error!' });
    }
};

