const express = require('express');
const ArticleController = require('../controllers/ArticleController');
const authentication = require('../middlewares/authentication');
const articles = express.Router()

articles.use(authentication)

articles.post('/', ArticleController.createArticle)
articles.get('/', ArticleController.getArticle)
articles.get('/:id', ArticleController.getArticleById)
articles.put('/:id', ArticleController.updateArticleById)
articles.delete('/:id', ArticleController.deleteArticleById)


module.exports = articles