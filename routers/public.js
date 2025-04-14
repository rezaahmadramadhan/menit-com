const express = require('express');
const publicController = require('../controllers/publicController');
const public = express.Router()

public.get('/articles', publicController.getPubArticle)


module.exports = public