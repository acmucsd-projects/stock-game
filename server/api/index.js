const express = require('express');
//const UserService = require('../services/user');
const User = require('../models/user');
const router = express.Router();


router.get('/user', async (req, res) => {
    const user = await User.find().exec();
    res.status(200).json({ user });
  })

router.post('/user', async (req, res) => {
    const { user } = req.body;
    console.log("req.body: " + JSON.stringify(req.body));
    console.log("user: " + user);
    const { name, bio } = user
    console.log(name);
    if (!name){
        res.status(400).json({ error: 'Invalid input' });
    }
    else {
        const newUser = await User.create(user);
        res.status(200).json({ user: newUser });
    }
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