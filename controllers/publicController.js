const { Article } = require("../models")

class PublicController {
    static async getHome(req, res, next) {
        try {
            res.json({ message: "Welcome Home" })
        } catch (error) {
            next(error)
        }
    }

    static async getPubArticle(req, res, next) {
        try {
            const article = await Article.findAll()

            res.status(200).json(article)
        } catch (error) {
            next(error)
        }
    }

    static async getPubArticleById(req, res, next) {
        try {
            const { id } = req.params
            const article = await Article.findByPk(+id)

            if (!article) {
                throw {
                    name: "NotFound",
                    message: `Article with ID ${id} not found`
                }
            }

            res.status(200).json(article)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PublicController