exports.authenticateUser = async (req, res, next) => {
    try {
        // TODO: Implement Auth
        req.user = {};

        next();
    } catch (err) {
        console.log(`${err}`.red);
        res.status(500).json({ success: false, msg: 'Internal Server Error!' });
    }
};

exports.authorizeUser = async (req, res, next) => {
    try {
        // TODO: Add RBAC
        req.authorized = true;

        next();
    } catch (err) {
        console.log(`${err}`.red);
        res.status(500).json({ success: false, msg: 'Internal Server Error!' });
    }
};
