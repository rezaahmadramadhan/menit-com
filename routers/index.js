const express = require('express');
const HomeController = require('../controllers/homeController');
const authentication = require('../middlewares/authentication');
const router = express.Router()

router.get('/', HomeController.getHello)
router.use('/pub', require("./public"))

router.use(authentication)

router.use('/articles', require("./articles"))
router.use('/categories', require("./categories"))
router.use('/', require("./auth"))


module.exports = router