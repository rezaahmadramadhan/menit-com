const express = require('express');
const publicController = require('../controllers/publicController');
const public = express.Router()

public.post('/', publicController.getPubArticle)


module.exports = public