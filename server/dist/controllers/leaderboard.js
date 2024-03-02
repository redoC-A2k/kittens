"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../client");
const wonGame = async (req, res) => {
    const { username } = req.params;
    try {
        let score = await client_1.client.ZINCRBY('leaderboard', 1, `user:${username}`);
        res.status(200).json(score);
    }
    catch (error) {
        console.log("Error while updating user points : ", error);
        res.status(500).json("Error while updating user points");
    }
};
const getLeaderboard = async (req, res) => {
    try {
        let leaderboard = await client_1.client.zRangeWithScores('leaderboard', 0, 9, {
            REV: true
        });
        res.status(200).json(leaderboard);
    }
    catch (error) {
        console.log("Error while fetching leaderboard : ", error);
        res.status(500).json("Error while fetching leaderboard");
    }
};
const getScore = async (req, res) => {
    const { username } = req.params;
    try {
        let score = await client_1.client.zScore('leaderboard', `user:${username}`);
        res.status(200).json(score);
    }
    catch (error) {
        console.log("Error while fetching user score : ", error);
        res.status(500).json("Error while fetching user score");
    }
};
exports.default = { wonGame, getLeaderboard, getScore };
//# sourceMappingURL=leaderboard.js.map