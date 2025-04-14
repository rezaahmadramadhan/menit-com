const express = require('express');
const ArticleController = require('../controllers/ArticleController');
const articles = express.Router()

articles.post('/', ArticleController.createArticle)
articles.get('/', ArticleController.getArticle)
articles.get('/:id', ArticleController.getArticleById)
articles.put('/:id', ArticleController.updateArticleById)
articles.delete('/:id', ArticleController.deleteArticleById)


module.exports = articles