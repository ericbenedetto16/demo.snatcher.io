const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { User } = require('../models');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
};

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (jwtPayload, done) => {
            try {
                const user = await User.findOne({
                    where: {
                        email: jwtPayload.sub,
                    },
                });

                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        })
    );
};
