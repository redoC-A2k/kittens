const { client } = require("../client")

exports.wonGame = async (req, res) => {
    const { username } = req.params
    try {
        let score = await client.ZINCRBY('leaderboard', 1, `user:${username}`);
        res.status(200).json(score)
    } catch (error) {
        console.log("Error while updating user points : ", error)
        res.status(500).json("Error while updating user points")
    }
}

exports.getLeaderboard = async (req, res) => {
    try {
        let leaderboard = await client.zRangeWithScores('leaderboard', 0, 9, {
            REV: true
        })
        res.status(200).json(leaderboard)
    } catch (error) {
        console.log("Error while fetching leaderboard : ", error)
        res.status(500).json("Error while fetching leaderboard")
    }
}

exports.getScore = async (req,res) => {
    const {username} = req.params
    try {
        let score = await client.zScore('leaderboard', `user:${username}`)
        res.status(200).json(score)
    } catch (error) {
        console.log("Error while fetching user score : ", error)
        res.status(500).json("Error while fetching user score")
    }
}