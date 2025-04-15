const express = require('express');
const HomeController = require('../controllers/homeController');
const authentication = require('../middlewares/authentication');
const router = express.Router()

router.get('/', HomeController.getHello)
router.use('/pub', require("./public"))
router.use('/articles', authentication, require("./articles"))
router.use('/categories', authentication, require("./categories"))
router.use('/', require("./auth"))


module.exports = router