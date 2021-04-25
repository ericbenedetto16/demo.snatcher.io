const jwt = require("jsonwebtoken")
const { User } = require("../models")


exports.authenticateUser = async (req, res, next) => {
    try {
        // TODO: Implement Auth
        // req.user = {};


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

        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1]
        if (token == null)
            return res.sendStatus(401)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)

            // console.log(user.name)
            req.user = user
            next()
        })

        next();
    } catch (err) {
        console.log(`${err}`.red);
        res.status(500).json({ success: false, msg: 'Internal Server Error!' });
    }
};

// exports.unAuthorizeUser = async (req, res, next) => {
//     try {
//         // req.authorized = true;

//         next();
//     } catch (err) {
//         console.log(`${err}`.red);
//         res.status(500).json({ success: false, msg: 'Internal Server Error!' });
//     }
// };
