const express = require('express');
const cors = require('cors');
const router = require('./api');
const server = express();
const mongoose = require('mongoose')

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}))
server.use('/api',router);

//mongoose.connect(ATLAS_URL)

server.listen(5000, () => {
    console.log('Server started on port 5000!')
});
