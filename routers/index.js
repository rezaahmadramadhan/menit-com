const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router()

router.get('/', homeController.getHello)

router.use('/articles', require("./articles"))


module.exports = router