const passport = require('passport');

exports.setAuthOptional = async (req, res, next) => {
    try {
        req.authOptional = true;

        next();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'Internal Server Error',
        });
    }
};

exports.authenticateUser = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.log(err);
            if (!req.authOptional) return res.sendStatus(401);

            return next();
        }

        if (!user && !req.authOptional) return res.sendStatus(401);

        if (!user && req.authOptional === true) return next();

        req.user = user;

        next();
    })(req, res, next);
};

exports.authorizeUser = async (req, res, next) => {
    try {
        if (!req.user && !req.authOptional) res.sendStatus(401);
        if (!req.user && req.authOptional === true) return next();

        // TODO: Add All Protected Routes and Their Roles in Here
        const protectedRoutes = new Map([
            ['/slugs/disable', new Set(['admin'])],
        ]);

        if (!protectedRoutes.has(req.path)) return next();

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
        console.log(err);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
};
