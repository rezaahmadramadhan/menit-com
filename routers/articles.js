const express = require('express');
const articleController = require('../controllers/articleController');
const articles = express.Router()

articles.post('/', articleController.createArticle)


module.exports = articles