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

describe('POST /login', () => {
    test('POST /login should SUCCESS login & send access_token', async () => {
        const response = await request(app).post('/login').send({email: "testAdmin@gmail.com", role: "Admin", password: "admin"})
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("access_token", expect.any(String))
    })
    
    test('POST /login should FAILED login without email', async () => {
        const response = await request(app).post('/login').send({email: "", role: "Admin", password: "admin"})
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Email is required")
    })
    
    test('POST /login should FAILED login without password', async () => {
        const response = await request(app).post('/login').send({email: "testAdmin@gmail.com", role: "Admin", password: ""})
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Password is required")
    })
    
    test('POST /login should FAILED login with invalid email', async () => {
        const response = await request(app).post('/login').send({email: "testAdmin", role: "Admin", password: "admin"})
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid email/password")
    })
    
    test('POST /login should FAILED login with unmatched password', async () => {
        const response = await request(app).post('/login').send({email: "testAdmin@gmail.com", role: "Admin", password: "inisalah"})
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid email/password")
    })
})

describe('POST /articles', () => {
    test('POST /articles should SUCCESS create article', async () => {
        const article = {
            title: "Membentuk Rutinitas Olahraga",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg",
            categoryId: 5
        }
        const response = await request(app).post('/articles').send(article).set("Authorization", `Bearer ${accessTokenAdmin}`)
        
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("title", article.title)
    })

    test('POST /articles should FAILED not logged in yet', async () => {
        const article = {
            title: "Membentuk Rutinitas Olahraga",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg",
            categoryId: 5
        }
        const response = await request(app).post('/articles').send(article)
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    test('POST /articles should FAILED invalid token', async () => {
        const article = {
            title: "Membentuk Rutinitas Olahraga",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg",
            categoryId: 5
        }
        const response = await request(app).post('/articles').send(article).set("Authorization", `Bearer tokensalah${accessTokenAdmin}`)
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    test('POST /articles should FAILED validation error', async () => {
        const article = {
            title: "",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg",
            categoryId: 5
        }
        const response = await request(app).post('/articles').send(article).set("Authorization", `Bearer ${accessTokenAdmin}`)
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Title is required")
    })
})

describe('PUT /articles/:id', () => {
    test('PUT /articles/:id should SUCCESS update article with ID', async () => {
        const article = {
            title: "Update Title Terbaru",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg"
        }
        const response = await request(app).post('/articles/').send(article).set("Authorization", `Bearer ${accessTokenAdmin}`)
    })
})