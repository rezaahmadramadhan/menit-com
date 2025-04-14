const express = require('express');
const categoryController = require('../controllers/categoryController');
const categories = express.Router()

categories.post('/', categoryController.createCategory)


module.exports = categories