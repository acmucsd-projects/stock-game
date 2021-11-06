const express = require('express');
//const UserService = require('../services/user');
const User = require('../models/user');
const router = express.Router();


router.get('/user', async (req, res) => {
    const user = await User.find().exec();
    res.status(200).json({ user });
  })

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