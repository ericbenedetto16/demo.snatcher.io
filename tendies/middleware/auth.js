exports.validateUser = (req, res, next) => {
    if (!req.headers.user) {
        return res.sendStatus(403);
    }

    req.user = req.headers.user;

    next();
};
