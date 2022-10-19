const { Passport } = require('passport');
const { jwtSecret } = require('../config');
const { getUserById } = require('../users/user.controllers');

const JwtStrategy = require('passport').Strategy;
const ExtraJwt = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
    const options = {
        jwtFromRequest : ExtraJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: jwtSecret
    }
}

passport.use(
    new JwtStrategy(options, async(decoded, done) => {
        try {
            const response = await getUserById(decoded.id)
            if (!response ){
                return done(null, false)
            }
            return done(null, decoded)
        } catch (error) {
            return done(error, false)
        }
    })
)