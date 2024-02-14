const { Repository } = require('redis-om');
const { userSchema } = require('../models/user');
const { client } = require('../client');
const userRespository = new Repository(userSchema, client)
module.exports = { userRespository }