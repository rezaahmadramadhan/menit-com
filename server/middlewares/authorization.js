const { Article } = require("../models")

function onlyAdmin(req, res, next) {
    try {
        if (req.user.role !== "Admin") throw { name: "Forbidden", message: "You're not authorized"}
        
        next()
    } catch (error) {
        next(error)
    }
}

async function authAdmin(req, res, next) {
    try {
        const { id } = req.params
        const article = await Article.findByPk(+id)

        if (!article) throw { name: "NotFound", message: `Article with ${id} not found`}

        if (req.user.id !== article.authorId && req.user.role !== "Admin") throw {name: "Forbidden", message: "You're not authorized"}
        
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {onlyAdmin, authAdmin}