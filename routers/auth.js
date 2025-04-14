const express = require('express');
const UserController = require('../controllers/userController');
const user = express.Router()

user.post('/add-user', UserController.addUser)
user.post('/login', UserController.login)


module.exports = user