const User = require('../models/user');
const config = require('../config');
const axios = require('axios');

/**
 * Returns all users in the database
 */
async function findAll(){
    return await User.find().exec();
}

/**
 * Queries the database for a specific user based on the given id
 * @param {id} id 
 */
 async function findById(id) {
    return await User.findById(id).exec();
  }

/**
 * Adds a user to the database
 * @param {User} user
 */
async function createUser(user) {
    return User.create(user);
  }
module.exports = {
    findAll,
    findById,
    createUser
};