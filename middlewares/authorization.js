function onlyAdmin(req, res, next) {
    try {
        if (req.user.role !== "Admin") throw { name: "Forbidden", message: "You're not authorized"}
        
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = onlyAdmin