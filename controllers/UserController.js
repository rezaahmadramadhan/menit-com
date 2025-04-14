const { User } = require("../models")

class UserController {
    static async addUser(req, res) {
        try {
            const user = await User.create(req.body)
            const result = user.toJSON()
            delete result.password
            
            res.status(201).json(result)
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({ message: error.errors[0].message });
            }
    
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

module.exports = UserController