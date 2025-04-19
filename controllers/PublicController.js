const { where } = require("sequelize")
const { Article } = require("../models")
const { Op } = require("sequelize")

class PublicController {
    static async getHome(req, res, next) {
        try {
            res.json({ message: "HCK82 - Reza Ahmad Ramadhan ( P2 - GC01 )" })
        } catch (error) {
            next(error)
        }
    }

    static async getPubArticle(req, res, next) {
        try {
            const { search, sort, filter, page = 1, limit = 10 } = req.query
            const paramsQuery = { where: { } }
            
            if(search) {
                paramsQuery.where.title= {[Op.iLike]: `%${search}%`}
            }

            if(sort) {
                const order = sort[0] === "-" ? "DESC" : "ASC"
                const colName = order === "DESC" ? sort.slice(1) : sort

                paramsQuery.order = [[colName, order]]
            }

            if(filter) {
                paramsQuery.where.categoryId= filter
            }

            paramsQuery.limit = +limit
            paramsQuery.offset = +limit * (page - 1) 
            
            const { count, rows } = await Article.findAndCountAll(paramsQuery);

            res.status(200).json({
                page: +page, 
                pageData: rows.length,
                totalData: count,
                data: rows
            })
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