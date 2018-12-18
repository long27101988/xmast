const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const config = require('./config');

var opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.keySecure

passport.serializeUser(function(user, done) {
    done(null, user._id)
})

passport.deserializeUser(function(user, done) {
    User.findOne({_id: user._id}, function(err, user) {
        done(err, user)
    })
});

passport.use(new LocalStrategy({
    usernameField: "email"
}, function(username, password, done) {
    User.findOne({email: username}, function(err, user) {
        if(err) return done(err)
        if(!user) return done(null, false, {
            message: "Incorrect username or password"
        });

        if(!user.validPassword(password)) return done(null, false, {
            message: "Incorrect username or password"
        })

        return done(null, user)
    })
}))

passport.use(new JWTStrategy(opts, function(jwtPayload, done) {
    User.findById(jwtPayload._id, function (err, user) {
        if (err) return done(err)
        if (!user) return done(null, false, {
            message: "Incorrect username or password"
        });

        return done(null, user)
    })
}))