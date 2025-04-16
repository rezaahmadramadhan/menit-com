const express = require('express');
const PublicController = require('../controllers/publicController');
const publicRouter = express.Router()

publicRouter.get('/', PublicController.getHome)
publicRouter.get('/pub/articles', PublicController.getPubArticle)
publicRouter.get('/pub/articles/:id', PublicController.getPubArticleById)


module.exports = publicRouter