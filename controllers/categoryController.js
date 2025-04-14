const { Category } = require("../models")
class categoryController {
    static async createCategory(req, res) {
        try {
            const category = await Category.create(req.body)
            res.status(201).json(category)
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({ message: error.errors[0].message })
            }
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

module.exports = categoryController