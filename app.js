require('dotenv').config()

const express = require('express');
const authentication = require('./middlewares/authentication');
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(authentication)

app.use('/', require("./routers"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
