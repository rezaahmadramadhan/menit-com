const express = require('express');
const ArticleController = require('../controllers/ArticleController');
const onlyAdmin = require('../middlewares/authorization');
const articles = express.Router()

articles.use(onlyAdmin)
articles.post('/', ArticleController.createArticle)
articles.get('/', ArticleController.getArticle)
articles.get('/:id', ArticleController.getArticleById)
articles.put('/:id', ArticleController.updateArticleById)
articles.delete('/:id', ArticleController.deleteArticleById)


module.exports = articles