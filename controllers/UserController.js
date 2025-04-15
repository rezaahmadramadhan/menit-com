const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { User } = require("../models")

class UserController {
    static async addUser(req, res, next) {
        try {
            const user = await User.create(req.body)
            const result = user.toJSON()
            delete result.password
            
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const {email, password} = req.body

            if (!email) {
                throw { name: "BadRequest", message: "Email is required" }
            }
    
            if (!password) {
                throw { name: "BadRequest", message: "Password is required" }
            }

            const user = await User.findOne({
                where: { email }
            })

            if (!user) {
                throw { name: "Unauthorized", message: "Invalid email/password" }
            }

            const isValid = comparePassword(password, user.password)
            
            if (!isValid) {
                
                throw { name: "Unauthorized", message: "Invalid email/password" }
            }

            const access_token = signToken({ id: user.id, email: user.email, role: user.role })

            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController