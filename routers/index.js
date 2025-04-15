const express = require('express');
const HomeController = require('../controllers/homeController');
const authentication = require('../middlewares/authentication');
const onlyAdmin = require('../middlewares/authorization');
const router = express.Router()

router.get('/', HomeController.getHello)
router.use('/pub', require("./public"))
router.use('/articles', authentication, onlyAdmin, require("./articles"))
router.use('/categories', authentication, onlyAdmin, require("./categories"))
router.use('/', authentication, require("./auth"))


module.exports = router