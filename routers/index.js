const express = require('express');
const authentication = require('../middlewares/authentication');
const router = express.Router()

router.use('/', require("./auth"))
router.use('/', require("./public"))
router.use('/articles', authentication, require("./articles"))
router.use('/categories', authentication, require("./categories"))


module.exports = router