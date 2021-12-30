const axios = require('axios');
const express = require('express');
//const UserService = require('../services/user');
const User = require('../models/user');
const Prediction = require('../models/predictionMongo')
const router = express.Router();
const passport = require("passport");
var loggedIn = false
var session = ''

router.get("/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
);

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
      req.session.user = req.user;
      session = req.session.user['googleId']
      console.log("req.user " + req.session.user);
    // Successful authentication, redirect home
    res.redirect('http://localhost:3000/');
    loggedIn = true
  });
  //res.send


router.get('/logout', async (req, res) => {
    console.log("/logout request made ", req.session.user)
    // Log the user out, redirect home
    req.session.destroy();
    res.redirect("http://localhost:3000");
})

// to handle promises either do .then .catch or async await
router.get('/user', async (req, res) => {
    console.log("/user request made ", req.session.user)
    const user = req.session.user
    res.status(200).json({ user });
})

router.get('/prediction', async (req, res) => {
    const prediction = await Prediction.find().exec();
    res.status(200).json({ prediction });
})

router.get('/user_predictions', async (req, res) => {
    console.log("req.session: ", req.session.user)
    var query = { googleId_d: String(req.session.user['googleId'])};
    const predictions = await Prediction.find(query).exec();
    res.status(200).json({ predictions })
})
//got googleId to mongoDb database

router.post('/predictions', async (req, res) => {
    const { ticker, length, predictedPrice, initialPrice, time, googleId} = req.body;
    // var googleId = ""
    // await axios.get('http://localhost:5000/api/user').then(res => {
    //     googleId = res
    // })
    console.log(typeof(googleId))
    const prediction = new Prediction({
        ticker_d: ticker, length_d:length, predictedPrice_d:predictedPrice, initialPrice_d: initialPrice, 
        time_d: time, googleId_d: googleId
    })
    try{
        const newPrediction = await prediction.save();
        res.status(200).json({ newPrediction });
    }
    catch (err) {console.log(err)}   
});

router.post('/createuser', async (req, res) => {
    console.log('Route WORKING');
    const { nameValue, bioValue } = req.body;
    //console.log("req.body: " + JSON.stringify(req.body));
    //console.log("user: " + user);
    const user = new User({
        name: nameValue, bio: bioValue
    })
    try{
        const newUser = await user.save();
        res.status(200).json({ newUser });
    }
    catch (err) {console.log(err)}   
});

/* router.get('/pokemon',(req, res) => {
    const pokemon = [
        {
            name: 'Pikachu',
            description: 'the pika',
            type1: 'Electric',
            type2: null,
            image: 'google.com',
            moves: [
                {
                    name: 'Scratch',
                    power: 30
                }
            ]
        }, 
        {
            name: 'Snorlax',
            description: 'sleep',
            type1: 'Normal',
            type2: null,
            image: 'google.com',
            moves: [
                {
                    name: 'Sleep',
                    power: 10
                }
            ]
        }
    ]
    res.status(200).json({pokemon: pokemon})
}); */

module.exports = router;