const { userRespository } = require("../repository/user")

exports.loginUser = async (req, res) => {
    const {username} = req.body
    try {
        const user = await userRespository.fetch(username)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json("Error while fetching user")
    }
}
