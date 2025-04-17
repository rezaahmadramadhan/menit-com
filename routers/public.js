const express = require('express');
const PublicController = require('../controllers/publicController');
const CategoryController = require('../controllers/CategoryController');
const publicRouter = express.Router()

publicRouter.get('/', PublicController.getHome)
publicRouter.get('/pub/articles', PublicController.getPubArticle)
publicRouter.get('/pub/articles/:id', PublicController.getPubArticleById)
publicRouter.get('/pub/category', CategoryController.getCategory)


module.exports = publicRouter