const { test, describe, expect, beforeAll, afterAll } = require("@jest/globals")
const {Article, User} = require('../models')
const articleTest = require('../data/article-test.json')
const { signToken } = require("../helpers/jwt")

async function beforeAll() {
    await Article.bulkCreate(articleTest)
    
    const userAdmin = await User.create({email: "testAdmin@gmail.com", role: "Admin"})
    accessTokenAdmin = signToken({id: userAdmin.id})

    const userStaff = await User.create({email: "testStaff@gmail.com", role: "Staff"})
    accessTokenAdmin = signToken({id: userStaff.id})
}

module.exports = {beforeAll}