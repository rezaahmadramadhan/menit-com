require('dotenv').config();
const request = require('supertest')

const { test, describe, expect, beforeAll, afterAll } = require("@jest/globals")
const {Category, Article, User} = require('../models')
const { signToken } = require("../helpers/jwt")
const app = require("../app");

let userAdmin
let userStaff
let accessTokenAdmin
let accessTokenStaff

beforeAll(async () => { 
    userAdmin = await User.create({id: 1, email: "testAdmin@gmail.com", role: "Admin", password: "admin"})
    accessTokenAdmin = signToken({id: userAdmin.id})

    userStaff = await User.create({id: 2, email: "testStaff@gmail.com", role: "Staff", password: "rahasia"})
    accessTokenStaff = signToken({id: userStaff.id})
})

afterAll(async () => {
    await User.destroy({
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

describe('POST /login', () => {
    test('POST /login should SUCCESS login & send access_token', async () => {
        const response = await request(app)
                        .post('/login')
                        .send({email: "testAdmin@gmail.com", role: "Admin", password: "admin"})
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("access_token", expect.any(String))
    })
    
    test('POST /login should FAILED login without email', async () => {
        const response = await request(app)
                        .post('/login')
                        .send({email: "", role: "Admin", password: "admin"})
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Email is required")
    })
    
    test('POST /login should FAILED login without password', async () => {
        const response = await request(app)
                        .post('/login')
                        .send({email: "testAdmin@gmail.com", role: "Admin", password: ""})
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Password is required")
    })
    
    test('POST /login should FAILED login with invalid email', async () => {
        const response = await request(app)
                        .post('/login')
                        .send({email: "testAdmin", role: "Admin", password: "admin"})
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid email/password")
    })
    
    test('POST /login should FAILED login with unmatched password', async () => {
        const response = await request(app)
                        .post('/login')
                        .send({email: "testAdmin@gmail.com", role: "Admin", password: "inisalah"})
        
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
            categoryId: 5,
            authorId: userAdmin.id
        }

        const response = await request(app)
                        .post('/articles').send(article)
                        .set("Authorization", `Bearer ${accessTokenAdmin}`)
        
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("title", article.title)
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
        const article = {
            id: 1,
            title: "Judul Awal",
            content: "Konten awal...",
            imgUrl: "/uploads/initial-image.jpg",
            categoryId: 1,
            authorId: userAdmin.id
        }       
        let response = await request(app)
                      .post('/articles')
                      .send(article)
                      .set("Authorization", `Bearer ${accessTokenAdmin}`)
    
        const updatedArticle = {
            title: "Update Title Terbaru",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg"
        }
        response = await request(app)
                  .put(`/articles/${article.id}`)
                  .send(updatedArticle)
                  .set("Authorization", `Bearer ${accessTokenAdmin}`);
        
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("title", updatedArticle.title)
    })

    test('PUT /articles/:id should FAILED not logged in yet', async () => {
        const article = {
            id: 1,
            title: "Judul Awal",
            content: "Konten awal...",
            imgUrl: "/uploads/initial-image.jpg",
            categoryId: 1,
            authorId: userAdmin.id
        }       
        let response = await request(app)
                      .post('/articles')
                      .send(article)
                      .set("Authorization", `Bearer ${accessTokenAdmin}`)
    
        const updatedArticle = {
            title: "Update Title Terbaru",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg"
        }
        response = await request(app)
                  .put(`/articles/${article.id}`)
                  .send(updatedArticle)
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    test('PUT /articles/:id should FAILED invalid token', async () => {
        const article = {
            id: 1,
            title: "Judul Awal",
            content: "Konten awal...",
            imgUrl: "/uploads/initial-image.jpg",
            categoryId: 1,
            authorId: userAdmin.id
        }       
        let response = await request(app)
                      .post('/articles')
                      .send(article)
                      .set("Authorization", `Bearer ${accessTokenAdmin}`)
    
        const updatedArticle = {
            title: "Update Title Terbaru",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg"
        }
        response = await request(app)
                  .put(`/articles/${article.id}`)
                  .send(updatedArticle)
                  .set("Authorization", `Bearer tokensalah${accessTokenAdmin}`)
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    test('PUT /articles/:id should FAILED id not found', async () => {
        const article = {
            id: 1,
            title: "Judul Awal",
            content: "Konten awal...",
            imgUrl: "/uploads/initial-image.jpg",
            categoryId: 1,
            authorId: userAdmin.id
        }       
        let response = await request(app)
                      .post('/articles')
                      .send(article)
                      .set("Authorization", `Bearer ${accessTokenAdmin}`)
    
        const updatedArticle = {
            title: "Update Title Terbaru",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg"
        }
        response = await request(app)
                  .put(`/articles/5`)
                  .send(updatedArticle)
                  .set("Authorization", `Bearer ${accessTokenAdmin}`)
        
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message", "Article with 5 not found")
    })

    test('PUT /articles/:id should FAILED staff update without authorization', async () => {
        const article = {
            id: 1,
            title: "Judul Awal",
            content: "Konten awal...",
            imgUrl: "/uploads/initial-image.jpg",
            categoryId: 1,
            authorId: userAdmin.id
        }       
        let response = await request(app)
                      .post('/articles')
                      .send(article)
                      .set("Authorization", `Bearer ${accessTokenAdmin}`)
    
        const updatedArticle = {
            title: "Update Title Terbaru",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg",
            categoryId: 1,
            authorId: userStaff.id
        }
        response = await request(app)
                  .put(`/articles/${article.id}`)
                  .send(updatedArticle)
                  .set("Authorization", `Bearer ${accessTokenStaff}`)
        
        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message", "You're not authorized")
    })

    test('PUT /articles/:id should FAILED validation error', async () => {
        const article = {
            id: 1,
            title: "Judul Awal",
            content: "Konten awal...",
            imgUrl: "/uploads/initial-image.jpg",
            categoryId: 1,
            authorId: userAdmin.id
        }       
        let response = await request(app)
                      .post('/articles')
                      .send(article)
                      .set("Authorization", `Bearer ${accessTokenAdmin}`)
    
        const updatedArticle = {
            title: "",
            content: "Cara konsisten berolahraga untuk pemula...",
            imgUrl: "/uploads/exercise-routine.jpg",
            categoryId: 1,
            authorId: userAdmin.id
        }
        response = await request(app)
                  .put(`/articles/${article.id}`)
                  .send(updatedArticle)
                  .set("Authorization", `Bearer ${accessTokenAdmin}`)
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Title is required")
    })
})

describe('DELETE /articles/:id', () => {
    test('DELETE /articles/:id should SUCCESS delete article with ID', async () => {
        const article = {
            id: 23,
            title: "Judul Awal",
            content: "Konten awal...",
            imgUrl: "/uploads/initial-image.jpg",
            categoryId: 1,
            authorId: userAdmin.id
        }       
        let response = await request(app)
                      .post('/articles')
                      .send(article)
                      .set("Authorization", `Bearer ${accessTokenAdmin}`)
    
        response = await request(app)
                  .delete(`/articles/${article.id}`)
                  .set("Authorization", `Bearer ${accessTokenAdmin}`);
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message", `<${article.title}> success to delete`)
    })

    test('DELETE /articles/:id should FAILED not logged yet', async () => {
        const article = {
            id: 3,
            title: "Judul Awal",
            content: "Konten awal...",
            imgUrl: "/uploads/initial-image.jpg",
            categoryId: 1,
            authorId: userAdmin.id
        }       
        let response = await request(app)
                      .post('/articles')
                      .send(article)
                      .set("Authorization", `Bearer ${accessTokenAdmin}`)
    
        response = await request(app)
                  .delete(`/articles/${article.id}`)
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", `Invalid Token`)
    })
    
    test('DELETE /articles/:id should FAILED invalid token', async () => {
        const article = {
            id: 3,
            title: "Judul Awal",
            content: "Konten awal...",
            imgUrl: "/uploads/initial-image.jpg",
            categoryId: 1,
            authorId: userAdmin.id
        }       
        let response = await request(app)
                      .post('/articles')
                      .send(article)
                      .set("Authorization", `Bearer ${accessTokenAdmin}`)
    
        response = await request(app)
                  .delete(`/articles/${article.id}`)
                  .set("Authorization", `Bearer tokensalah${accessTokenAdmin}`)
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", `Invalid Token`)
    })

    test('DELETE /articles/:id should FAILED id not found', async () => {
        const article = {
            id: 3,
            title: "Judul Awal",
            content: "Konten awal...",
            imgUrl: "/uploads/initial-image.jpg",
            categoryId: 1,
            authorId: userAdmin.id
        }       
        let response = await request(app)
                      .post('/articles')
                      .send(article)
                      .set("Authorization", `Bearer ${accessTokenAdmin}`)
    
        response = await request(app)
                  .delete(`/articles/10`)
                  .set("Authorization", `Bearer ${accessTokenAdmin}`)
        
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message", `Article with 10 not found`)
    })

    test('DELETE /articles/:id should FAILED staff delete without authorization', async () => {
        const article = {
            id: 3,
            title: "Judul Awal",
            content: "Konten awal...",
            imgUrl: "/uploads/initial-image.jpg",
            categoryId: 1,
            authorId: userAdmin.id
        }       
        let response = await request(app)
                      .post('/articles')
                      .send(article)
                      .set("Authorization", `Bearer ${accessTokenAdmin}`)
    
        response = await request(app)
                  .delete(`/articles/${article.id}`)
                  .set("Authorization", `Bearer ${accessTokenStaff}`)
        
        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message", `You're not authorized`)
    })
})

// describe('GET /pub/articles', () => {
//     test('GET /pub/articles should SUCCESS get public articles', async () => {
//         // articleTest

//         const response = await request(app)
//                         .get('/pub/articles')
        
//         expect(response.status).toBe(200)
//         expect(response.body).toBeInstanceOf(Array)
//         expect(response.body[0]).toHaveProperty("title", "Update Title Terbaru")
//     })
// })