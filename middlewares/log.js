const logMiddleware = (req, res, next) => {
    next()
}

module.exports = logMiddleware