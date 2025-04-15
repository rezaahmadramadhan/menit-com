const { where } = require("sequelize")
const { Article, User} = require("../models")

class ArticleController {
    static async createArticle(req, res, next) {
        try {
            const newBody =  {...req.body}
            newBody.authorId = req.user.id
            const article = await Article.create(newBody)
            
            res.status(201).json(article)
        } catch (error) {
            next(error)
        }
    }

    static async getArticle(req, res, next) {
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
            next(error)
        }
    }

    static async getArticleById(req, res, next) {
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

    static async updateArticleById(req, res, next) {
        try {
            const { id } = req.params
            const article = await Article.findByPk(+id)

            if(!article) {
                throw {
                    name: "NotFound",
                    message: `Article with ID ${id} not found`
                }
            }

            const [, [updatedArticle]] = await Article.update(req.body, {
                where: {id},
                returning: true
            })
            
            res.status(200).json(updatedArticle)
        } catch (error) {
            next(error)
        }
    }

    static async deleteArticleById(req, res, next) {
        try {
            const { id } = req.params
            const article = await Article.findByPk(+id)

            if(!article) {
                throw {
                    name: "NotFound",
                    message: `Article with ID ${id} not found`
                }
            }

            article.destroy()

            res.status(200).json({
                message: `<${article.title}> success to delete`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ArticleController