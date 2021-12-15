const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config')



const UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    googleId: String,
})

// add plugins to schema
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

const User = mongoose.model("User", UserSchema);

// create a passport middleware to handle google auth
passport.use(User.createStrategy());

// define a serializeUser method to provide some identifying token that can be saved
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// define a deserializeUser method to find the user based on the identifying token
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log("Username is " + profile.displayName);
        console.log("ID is ", profile.id);

        // TODO: find user instead of replacing it if user 
        // already exists
        const newUser = new User({
            username: profile.displayName,
            name: profile.displayName,
            googleId: profile.id
        })

        User.findOrCreate(newUser, function (err, user) {
            return cb(err, user);
        });
    }
));

module.exports = User;
