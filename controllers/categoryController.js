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

    static async getCategory(req, res) {
        try {
            const category = await Category.findAll()

            res.status(200).json(category)
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async updateCategory(req, res) {
        try {
            const { id } = req.params
            const category = await Category.findByPk(+id)
            
            if(!category) {
                throw {
                    name: "NotFound",
                    message: `Category with ID ${id} not found`
                }
            }

            const [, [updatedCategory]] = await Category.update(req.body, {
                where: {id},
                returning: true
            })

            res.status(200).json(updatedCategory)
        } catch (error) {
            if (error.name === "NotFound") {
                return res.status(404).json({
                    message: error.message
                })
            }

            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({ message: error.errors[0].message })
            }
            
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

module.exports = categoryController