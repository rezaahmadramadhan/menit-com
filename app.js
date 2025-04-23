if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const app = express()
const cors = require('cors')

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/', require("./routers"))

app.use(cors)
app.use(errorHandler)

module.exports = app