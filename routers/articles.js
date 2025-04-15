const express = require('express');
const ArticleController = require('../controllers/ArticleController');
const { authAdmin } = require('../middlewares/authorization');
const articles = express.Router()

articles.post('/', ArticleController.createArticle)
articles.get('/', ArticleController.getArticle)
articles.get('/:id', ArticleController.getArticleById)
articles.put('/:id', authAdmin, ArticleController.updateArticleById)
articles.delete('/:id', authAdmin, ArticleController.deleteArticleById)


module.exports = articles