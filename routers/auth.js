const express = require('express');
const UserController = require('../controllers/userController');
const {onlyAdmin} = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const user = express.Router()

user.post('/add-user', authentication, onlyAdmin, UserController.addUser)
user.post('/login', UserController.login)


module.exports = user