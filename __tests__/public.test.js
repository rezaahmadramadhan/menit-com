require('dotenv').config();
const request = require('supertest')
const { test, describe, expect, beforeAll, afterAll } = require("@jest/globals")
const {Category, Article, User} = require('../models')
const { signToken } = require("../helpers/jwt")
const app = require("../app");
const categories = require("../data/category.json")
const articles = require("../data/article.json")

let userAdmin
let userStaff
let accessTokenAdmin
let accessTokenStaff

beforeAll(async () => { 
    userAdmin = await User.create({email: "testAdmin@gmail.com", role: "Admin", password: "admin"})
    accessTokenAdmin = signToken({id: userAdmin.id})

    userStaff = await User.create({email: "testStaff@gmail.com", role: "Staff", password: "rahasia"})
    accessTokenStaff = signToken({id: userStaff.id})

    await Category.bulkCreate(categories)
    await Article.bulkCreate(articles)
})

afterAll(async () => {
    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })    

    await Category.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })    

    await Article.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })   
})

describe('GET /pub/articles', () => {
    test('GET /pub/articles should SUCCESS get public articles', async () => {
        const response = await request(app)
                        .get('/pub/articles')
        
        expect(response.status).toBe(200)
        expect(response.body.data).toBeInstanceOf(Array)
        expect(response.body.data[0]).toHaveProperty("title", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("content", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("categoryId", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("authorId", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("createdAt", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("updatedAt", expect.any(String))
    })

    test('GET /pub/articles should SUCCESS get public articles', async () => {
        const response = await request(app)
                        .get('/pub/articles?filter=3')
        
        expect(response.status).toBe(200)
        expect(response.body.data).toBeInstanceOf(Array)
        expect(response.body.data[0]).toHaveProperty("title", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("content", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("categoryId", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("authorId", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("createdAt", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("updatedAt", expect.any(String))
    })

    test('GET /pub/articles should SUCCESS get public articles, with length data per page', async () => {
        const response = await request(app)
                        .get('/pub/articles?page=3&limit=10')
        
        expect(response.status).toBe(200)
        expect(response.body.data).toBeInstanceOf(Array)
        expect(response.body).toHaveProperty("page", 3)
        expect(response.body).toHaveProperty("pageData", 10)
        expect(response.body.data[0]).toHaveProperty("title", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("content", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("categoryId", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("authorId", expect.any(Number))
        expect(response.body.data[0]).toHaveProperty("createdAt", expect.any(String))
        expect(response.body.data[0]).toHaveProperty("updatedAt", expect.any(String))
    })
})