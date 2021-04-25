const jwt = require("jsonwebtoken")
const { User } = require("../models")


// exports.authenticateUser = async (req, res, next) => {
//     try {
//         // TODO: Implement Auth
//         // req.user = {};


//         next();
//     } catch (err) {
//         console.log(`${err}`.red);
//         res.status(500).json({ success: false, msg: 'Internal Server Error!' });
//     }
// };

// exports.authorizeUser = async (req, res, next) => {
//     try {
//         // TODO: Add RBAC
//         req.authorized = true;

//         const authHeader = req.headers["authorization"]
//         const token = authHeader && authHeader.split(" ")[1]
//         if (token == null)
//             return res.sendStatus(401)

//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//             if (err) return res.sendStatus(403)

//             // console.log(user.name)
//             req.user = user
//             next()
//         })

//         next();
//     } catch (err) {
//         console.log(`${err}`.red);
//         res.status(500).json({ success: false, msg: 'Internal Server Error!' });
//     }
// };


const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// const User = require('../models').User;


function passwordsMatch(submittedPassword, storedPasswordHash) {
    return bcrypt.compareSync(submittedPassword, storedPasswordHash);
}

/*
  The following code runs at login time.

  The usernameField and passwordField options refer to the HTTP requests
  body parameter names. I've set this to look for an `email` parameter,
  but you may prefer to use a `username` parameter instead of an email.

  BEST PRACTICE: don't state why login failed to the user.
*/
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
},
    (email, password, done) => {
        User.findOne({ where: { email } })
            .then((user) => {
                if (!user) {
                    console.log('\n\nFailed Login: user does not exist\n\n');
                    return done(null, false, { message: 'Failed Login' });
                }

                if (passwordsMatch(password, user.passwordHash) === false) {
                    console.log('\n\nFailed Login: passwords did not match\n\n');
                    return done(null, false, { message: 'Failed Login' });
                }

                console.log('\n\nSuccessful Login\n\n');
                return done(null, user, { message: 'Successfully Logged In!' });
            })
            .catch(err => { return done(err) });
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findByPk(id)
        .then((user) => {
            if (!user) {
                done(null, false);
                return;
            }

            done(null, user);
            return;
        })
        .catch(err => done(err, null));
});

// Use this protect api routes that require a user to be logged in.
passport.isAuthenticated = () =>
    (req, res, next) => (req.user ? next() : res.sendStatus(401));


module.exports = passport;