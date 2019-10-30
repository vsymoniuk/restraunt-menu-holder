const User = require('./models/User')
const config = require('./config')

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.jwt

module.exports = passport => {

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {

            const user = await User.findById(jwt_payload.userId).select('email id role')

            if(user) {
                done(null, user)
            } else {
                done(null, false)
            }

        } catch(err) {
            console.log(err)
        }


    }))
}