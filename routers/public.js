const express = require('express');
const PublicController = require('../controllers/publicController');
const public = express.Router()

public.get('/', PublicController.getHome)
public.get('/pub/articles', PublicController.getPubArticle)
public.get('/pub/articles/:id', PublicController.getPubArticleById)


module.exports = public