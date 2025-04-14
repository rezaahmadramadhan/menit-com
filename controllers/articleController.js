const { Article, User} = require("../models")

class articleController {
    static async createArticle(req, res) {
        try {
            const article = await Article.create(req.body)
            res.status(201).json(article)
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({ message: error.errors[0].message })
            }
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async getArticle(req, res) {
        try {
            const article = await Article.findAll({
                include: {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                }
            })

            res.status(200).json(article)
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

module.exports = articleController