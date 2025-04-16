require('dotenv').config();
const request = require('supertest')

const { test, describe, expect, beforeAll, afterAll } = require("@jest/globals")
const {Article, User} = require('../models')
const articleTest = require('../data/article-test.json')
const { signToken } = require("../helpers/jwt")
const app = require("../app");

let userAdmin
let userStaff
let accessTokenAdmin
let accessTokenStaff
beforeAll(async () => { 
    userAdmin = await User.create({email: "testAdmin@gmail.com", role: "Admin", password: "admin"})
    accessTokenAdmin = signToken({id: userAdmin.id})

    userStaff = await User.create({email: "testStaff@gmail.com", role: "Staff", password: "rahasia"})
    accessTokenStaff = signToken({id: userStaff.id})
})

afterAll(async () => {
    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })    
})

test('POST /login should login successfully', async () => {
    const response = await request(app).post('/login').send({email: "testAdmin@gmail.com", role: "Admin", password: "admin"})
    
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("access_token", expect.any(String))
})