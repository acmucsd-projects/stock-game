const express = require('express');
const config = require('./config')
const cors = require('cors');
const router = require('./api');
const server = express();
const mongoose = require('mongoose')
const session = require('express-session');
const passport = require('passport');

server.use(cors({
    origin:['http://localhost:3000', 'http://localhost:5000'],
    methods:['GET','POST'],
    credentials: true // enable set cookie
}));

server.use(express.urlencoded({extended:true}))
server.use(express.json());
server.use(session({
    secret: "Secret.",
    resave: false,
    saveUninitialized: false
  }));

server.use(passport.initialize());
server.use(passport.session());

server.use('/api',router);


mongoose.connect(config.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true }).then(()=> {
        console.log('Connected to MongoDB Database')
})
console.log(config.DATABASE_URL);

server.listen(config.PORT, () => {
    console.log('Server started on port ' + config.PORT);
});
