const { Article } = require("../models")

class publicController {
    static async getPubArticle(req, res) {
        try {
            const article = await Article.findAll()

            res.status(200).json(article)
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

module.exports = publicController