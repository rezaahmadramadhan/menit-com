const express = require('express');
const ArticleController = require('../controllers/ArticleController');
const { authAdmin } = require('../middlewares/authorization');
const multer = require('multer')
const articles = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

articles.post('/', ArticleController.createArticle)
articles.get('/', ArticleController.getArticle)
articles.get('/:id', ArticleController.getArticleById)
articles.put('/:id', authAdmin, ArticleController.updateArticleById)
articles.patch('/:id/img-url', authAdmin, ArticleController.updateArticleById)
articles.delete('/:id', authAdmin, ArticleController.deleteArticleById)


module.exports = articles