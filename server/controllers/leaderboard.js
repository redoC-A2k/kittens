const { userRespository } = require("../repository/user")

exports.wonGame = async (req, res) => {
    const { username } = req.params
    try {
        const user = await userRespository.fetch(username)
        if (user.points)
            user.points = user.points + 1
        else user.points = 1;
        await userRespository.save(username, user)
        res.status(200).json(user)
    } catch (error) {
        console.log("Error while updating user points : ", error)
        res.status(500).json("Error while updating user points")
    }
}