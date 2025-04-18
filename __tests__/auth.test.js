require('dotenv').config();
const request = require('supertest')
const { User } = require('../models')
const { test, describe, expect, beforeAll, afterAll } = require("@jest/globals")
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

describe('POST /login (Admin)', () => {
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
