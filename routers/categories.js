const express = require('express');
const categoryController = require('../controllers/categoryController');
const categories = express.Router()

categories.post('/', categoryController.createCategory)
categories.get('/', categoryController.getCategory)
categories.put('/:id', categoryController.updateCategory)


module.exports = categories