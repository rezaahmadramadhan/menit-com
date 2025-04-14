const express = require('express');
const articleController = require('../controllers/articleController');
const articles = express.Router()

articles.post('/', articleController.createArticle)
articles.get('/', articleController.getArticle)
articles.get('/:id', articleController.getArticleById)


module.exports = articles