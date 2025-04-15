class HomeController {
    static async getHello(req, res, next) {
        try {
            res.json({ message: "Hello World!" })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = HomeController