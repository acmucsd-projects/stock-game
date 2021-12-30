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
    score: Number,
    picture: String,
    predictions: []
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
        //console.log(profile);

        // find user instead of replacing it if user 
        // already exists based on googleId
        User.find({googleId: profile.id})
            .limit(1)
            .exec(function(err, user) {
                // log error
                if (err) {
                    console.log("Error finding user");
                    return cb(err);
                }
                // if user not found, create new user
                if (user.length == 0) {
                    console.log("User not found, creating new user");
                    /// create new user
                    const newUser = new User({
                        username: profile.displayName,
                        name: profile.displayName,
                        googleId: profile.id,
                        score: 0,
                        picture: profile._json.picture,
                        predictions: []
                    })

                    // save user
                    newUser.save(function(err) {
                        if (err) {
                            console.log("Error saving user");
                            return cb(err);
                        }
                    })
                    
                    // return new user
                    console.log("New user created: ", newUser);
                    return cb(null, newUser);

                // if user found, return existing user
                } else {
                    // return index 0 because find returns an array
                    console.log("User found, using existing user: ", user[0]);
                    return cb(null, user[0]);   
                }
            });
    }
));

module.exports = User;
