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

describe('POST /articles', () => {
    test('POST /articles should SUCCESS create article', async () => {
        const article = {
            title: "Ini title baru",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg",
            categoryId: 1,
            authorId: userAdmin.id
        }

        const response = await request(app)
                        .post('/articles')
                        .send(article)
                        .set("Authorization", `Bearer ${accessTokenAdmin}`)
        
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("title", article.title)
        expect(response.body).toHaveProperty("content", article.content)
        expect(response.body).toHaveProperty("imgUrl", article.imgUrl)
        expect(response.body).toHaveProperty("categoryId", article.categoryId)
        expect(response.body).toHaveProperty("authorId", article.authorId)
        expect(response.body).toHaveProperty("createdAt", expect.any(String))
        expect(response.body).toHaveProperty("updatedAt", expect.any(String))
    })

    test('POST /articles should FAILED not logged in yet', async () => {
        const article = {
            title: "Membentuk Rutinitas Olahraga",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg",
            categoryId: 5,
            authorId: userAdmin.id
        }
        const response = await request(app)
                        .post('/articles')
                        .send(article)
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    test('POST /articles should FAILED invalid token', async () => {
        const article = {
            title: "Membentuk Rutinitas Olahraga",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg",
            categoryId: 5,
            authorId: userAdmin.id
        }
        const response = await request(app)
                        .post('/articles')
                        .send(article)
                        .set("Authorization", `Bearer tokensalah${accessTokenAdmin}`)
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    test('POST /articles should FAILED validation error', async () => {
        const article = {
            title: "",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg",
            categoryId: 5,
            authorId: userAdmin.id
        }
        const response = await request(app)
                        .post('/articles')
                        .send(article)
                        .set("Authorization", `Bearer ${accessTokenAdmin}`)
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Title is required")
    })
})

describe('PUT /articles/:id', () => {
    test('PUT /articles/:id should SUCCESS update article with ID', async () => {
        const updatedArticle = {
            title: "Update Title Terbaru",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg"
        }

        response = await request(app)
                  .put(`/articles/1`)
                  .send(updatedArticle)
                  .set("Authorization", `Bearer ${accessTokenAdmin}`);
        
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("title", updatedArticle.title)
        expect(response.body).toHaveProperty("content", updatedArticle.content)
        expect(response.body).toHaveProperty("imgUrl", updatedArticle.imgUrl)
        expect(response.body).toHaveProperty("categoryId", expect.any(Number))
        expect(response.body).toHaveProperty("authorId", expect.any(Number))
        expect(response.body).toHaveProperty("createdAt", expect.any(String))
        expect(response.body).toHaveProperty("updatedAt", expect.any(String))
    })

    test('PUT /articles/:id should FAILED not logged in yet', async () => {   
        const updatedArticle = {
            title: "Update Title Terbaru",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg"
        }
        response = await request(app)
                  .put(`/articles/5`)
                  .send(updatedArticle)
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    test('PUT /articles/:id should FAILED invalid token', async () => {   
        const updatedArticle = {
            title: "Update Title Terbaru",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg"
        }

        response = await request(app)
                  .put(`/articles/1`)
                  .send(updatedArticle)
                  .set("Authorization", `Bearer tokensalah${accessTokenAdmin}`)
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    test('PUT /articles/:id should FAILED id not found', async () => {
        const updatedArticle = {
            title: "Update Title Terbaru",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg"
        }

        response = await request(app)
                  .put(`/articles/100`)
                  .send(updatedArticle)
                  .set("Authorization", `Bearer ${accessTokenAdmin}`)
        
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message", "Article with 100 not found")
    })

    test('PUT /articles/:id should FAILED staff update without authorization', async () => {   
        const updatedArticle = {
            title: "Update Title Terbaru",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg",
            categoryId: 1,
            authorId: userStaff.id
        }

        response = await request(app)
                  .put(`/articles/5`)
                  .send(updatedArticle)
                  .set("Authorization", `Bearer ${accessTokenStaff}`)
        
        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message", "You're not authorized")
    })

    test('PUT /articles/:id should FAILED validation error', async () => {   
        const updatedArticle = {
            title: "",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg",
            categoryId: 1
        }

        response = await request(app)
                  .put(`/articles/1`)
                  .send(updatedArticle)
                  .set("Authorization", `Bearer ${accessTokenAdmin}`)
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Title is required")
    })
})

describe('DELETE /articles/:id', () => {
    test('DELETE /articles/:id should SUCCESS delete article with ID', async () => {    
        const article = await Article.findByPk(5)
        
        response = await request(app)
                  .delete(`/articles/5`)
                  .set("Authorization", `Bearer ${accessTokenAdmin}`)
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message", `<${article.title}> success to delete`)
    })

    test('DELETE /articles/:id should FAILED not logged yet', async () => {   
        response = await request(app)
                  .delete(`/articles/10`)
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", `Invalid Token`)
    })
    
    test('DELETE /articles/:id should FAILED invalid token', async () => {
        response = await request(app)
                  .delete(`/articles/10`)
                  .set("Authorization", `Bearer tokensalah${accessTokenAdmin}`)
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", `Invalid Token`)
    })

    test('DELETE /articles/:id should FAILED id not found', async () => {
        response = await request(app)
                  .delete(`/articles/100`)
                  .set("Authorization", `Bearer ${accessTokenAdmin}`)
        
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message", `Article with 100 not found`)
    })

    test('DELETE /articles/:id should FAILED staff delete without authorization', async () => {   
        response = await request(app)
                  .delete(`/articles/1`)
                  .set("Authorization", `Bearer ${accessTokenStaff}`)
        
        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message", `You're not authorized`)
    })
})

