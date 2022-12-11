const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
require('dotenv').config();

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
}

passport.use(new JWTStrategy(opts,function (jwtPayLoad,done) {
    User.findById(jwtPayLoad._id,function (err,user) {
        if (err) {console.log("Error in finding user form JWT");return;}

        if (user) {
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}));

module.exports = passport;