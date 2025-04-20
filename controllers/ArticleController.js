const { Article, User} = require("../models")
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

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

    static async updateArticleCoverById(req, res, next) {
        try {
            const {id} = req.params

            if (!req.file) throw {name: "BadRequest", message: `File not found`}
            
            const {mimetype, buffer} = req.file

            const article = await Article.findByPk(+id)
            
            if (!article) throw {name: "NotFound", message: `Article with ID ${id} not found`}
            
            const dataBuffer = buffer.toString('base64')
            const dataURI = `data:${mimetype};base64,${dataBuffer}`
            const {secure_url} = await cloudinary.uploader.upload(dataURI)
            
            await article.update({imgUrl: secure_url})            
            
            res.status(200).json({message: `Cover Article ${article.title} success to update`})
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

            await article.destroy()

            res.status(200).json({
                message: `<${article.title}> success to delete`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ArticleController