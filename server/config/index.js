const dotenv = require('dotenv');

dotenv.config();

const config = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
}

module.exports = config;