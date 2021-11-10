const dotenv = require('dotenv');

dotenv.config();

const config = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL
}

module.exports = config;