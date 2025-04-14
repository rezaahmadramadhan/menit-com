const express = require('express');
const HomeController = require('../controllers/homeController');
const router = express.Router()

router.get('/', HomeController.getHello)

router.use('/articles', require("./articles"))
router.use('/categories', require("./categories"))
router.use('/pub', require("./public"))


module.exports = router