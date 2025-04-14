const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const categories = express.Router()

categories.post('/', CategoryController.createCategory)
categories.get('/', CategoryController.getCategory)
categories.put('/:id', CategoryController.updateCategory)


module.exports = categories