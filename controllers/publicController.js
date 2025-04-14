const { Article } = require("../models")

class PublicController {
    static async getPubArticle(req, res) {
        try {
            const article = await Article.findAll()

            res.status(200).json(article)
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async getPubArticleById(req, res) {
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
            if (error.name === "NotFound") {
                return res.status(404).json({
                    message: error.message
                })
            }
            
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

module.exports = PublicController