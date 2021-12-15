const express = require('express');
//const UserService = require('../services/user');
const User = require('../models/user');
const router = express.Router();
const passport = require("passport");

router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/dashboard');
  });

router.get('/user', async (req, res) => {
    const user = await User.find().exec();
    res.status(200).json({ user });
  })
  //to handle promises either do .then .catch or async await

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

router.get('/pokemon',(req, res) => {
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
});

module.exports = router;