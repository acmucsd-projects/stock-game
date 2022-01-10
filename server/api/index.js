const axios = require('axios');
const express = require('express');
//const UserService = require('../services/user');
const User = require('../models/user');
const Prediction = require('../models/predictionMongo')
const router = express.Router();
const passport = require("passport");
const { findOneAndUpdate } = require('../models/user');
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
    // Successful authentication, redirect home
    res.redirect('http://localhost:3000/');
    loggedIn = true
  });
  //res.send


router.get('/logout', async (req, res) => {
    console.log("/logout request made ")
    // Log the user out, redirect home
    req.session.destroy();
    res.redirect("http://localhost:3000");
    loggedIn = false
})

// to handle promises either do .then .catch or async await
router.get('/user', async (req, res) => {
    console.log("/user request made ")
    const user = req.session.user
    res.status(200).json({ user });
})

router.get('/prediction', async (req, res) => {
    console.log("/prediction request made")
    const prediction = await Prediction.find().exec();
    res.status(200).json({ prediction });
})

router.get('/user/predictions', async (req, res) => {
    console.log("/user/predictions request made ")
    if(req.session.user != null) {
        var query = { googleId_d: String(req.session.user['googleId'])};
        const predictions = await Prediction.find(query).exec();
        console.log("Predictions Found ", predictions)
        res.status(200).json({ predictions })
    }
    // If user not logged in, return empty array
    else {
        console.log("User not logged in")
        const predictions = []
        res.status(200).json({ predictions })
    }    
})

router.get('/scores', async (req, res) => {
    console.log("/scores request made ")
    // find the first 100 users and their scores
    const scores = await User.find({}, { username: 1, score: 1})
    .limit(100)
    .exec();

    // sort scores from highest to lowest
    // if b score is greater than a, returns a
    // number greater than 1 meaning b takes precedence
    // vice versa
    scores.sort((a, b) => b.score - a.score);
    
    console.log("scores found ", scores)
    res.status(200).json({ scores })
})

router.post('/remove_prediction', async (req, res) => {
    const {ticker, length, predictedPrice, initialPrice, googleId, time} = req.body; //r for remove
    console.log('REMOVE')
    console.log(ticker, length, predictedPrice, initialPrice, googleId)
    const prediction = await Prediction.deleteOne(
        {
            'ticker_d': ticker, //d for database
            'length_d': length,
            'predictedPrice_d': predictedPrice,
            'initialPrice_d': initialPrice,
            'googleId_d':googleId,
            'time_d':time
        }
    )
    res.status(200).json({ prediction });
})

router.post('/update_userscore', async (req, res) => {
    const {length,predictedPrice,initialPrice,googleId,endPrice} = req.body; //r for remove
    console.log(length,predictedPrice,initialPrice,googleId,endPrice)
    console.log('TESTT')
    console.log("initalPrice", initialPrice)
    console.log("endPrice", endPrice) 
    console.log("Part 1 ", 1/((Math.abs(endPrice - predictedPrice)/endPrice)))
    console.log("Part 2 ", (Math.log(length+2) / Math.log(7))+0.3)
    console.log("Final Score ", Number((1/(Math.abs(endPrice-initialPrice)/endPrice))*
    ((Math.log(length+2) / Math.log(7))+0.3)))
    console.log(Number((1/(Math.abs(endPrice-predictedPrice)/endPrice))*
    ((Math.log(length+2) / Math.log(7))+0.3)))
    console.log(googleId)
    const user = await User.updateOne(
        {
            'googleId':googleId
        },
        {
            $inc:{
                score:Number((1/(Math.abs(endPrice-predictedPrice)/endPrice))*
                ((Math.log(length+2) / Math.log(7))+0.3))
            }
        }
    )
    res.status(200).json({ user });
})

router.post('/predictions', async (req, res) => {
    const { ticker, length, predictedPrice, initialPrice, time, googleId} = req.body;
    // var googleId = ""
    // await axios.get('http://localhost:5000/api/user').then(res => {
    //     googleId = res
    // })

    console.log("/predictions request made ")

    // check if ticker is valid by making a request to the API
    var tdResponse = {};
    await axios.get('https://api.tdameritrade.com/v1/marketdata/quotes?apikey=LMDASP6A1ADRYUA6YMIEWWCI7GEFTOFL&symbol=' + ticker)
    .then(response => {
      tdResponse =  response.data
      //console.log (tdResponse.length)
    })

    // if ticker is invalid, return error
    if (Object.keys(tdResponse).length === 0) {
        try{
            console.log("Ticker not valid")
            res.status(406).json({ error: "Invalid Ticker" });
        } catch {
            console.log("Error sending invalid ticker error ", err)
        }
    } else {

        const prediction = new Prediction({
            ticker_d: ticker, length_d:length, predictedPrice_d:predictedPrice, initialPrice_d: initialPrice, 
            time_d: time, googleId_d: googleId
        })
        try{
            const newPrediction = await prediction.save();
            res.status(200).json({ newPrediction });
        }
        catch (err) {console.log(err)}  
    } 
});

//Deprecated
// router.post('/createuser', async (req, res) => {
//     console.log('Route WORKING');
//     const { nameValue, bioValue } = req.body;
//     //console.log("req.body: " + JSON.stringify(req.body));
//     //console.log("user: " + user);
//     const user = new User({
//         name: nameValue, bio: bioValue
//     })
//     try{
//         const newUser = await user.save();
//         res.status(200).json({ newUser });
//     }
//     catch (err) {console.log(err)}   
// });

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