const { Category } = require("../models")
class CategoryController {
    static async createCategory(req, res, next) {
        try {
            const category = await Category.create(req.body)

            res.status(201).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async getCategory(req, res, next) {
        try {
            const category = await Category.findAll()

            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async updateCategory(req, res, next) {
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
            next(error)
        }
    }
}

module.exports = CategoryController