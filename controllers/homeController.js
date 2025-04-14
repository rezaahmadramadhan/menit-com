class HomeController {
    static async getHello(req, res) {
        try {
            res.json({ message: "Hello World!" })
        } catch (error) {
            
        }
    }
}

module.exports = HomeController