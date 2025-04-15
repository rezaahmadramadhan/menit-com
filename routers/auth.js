const express = require('express');
const UserController = require('../controllers/userController');
const onlyAdmin = require('../middlewares/authorization');
const user = express.Router()

user.post('/add-user',onlyAdmin, UserController.addUser)
user.post('/login', UserController.login)


module.exports = user