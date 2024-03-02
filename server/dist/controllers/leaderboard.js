"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const client_1 = require("../client");
const constants_1 = __importDefault(require("../constants"));
const ws_1 = require("ws");
const wonGame = async (req, res) => {
    const { username } = req.params;
    try {
        let score = await client_1.client.ZINCRBY('leaderboard', 1, `user:${username}`);
        let leaderboard = await client_1.client.zRangeWithScores('leaderboard', 0, 9, {
            REV: true
        });
        __1.wsServer.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(JSON.stringify({ type: constants_1.default.LATEST_LEADERBOARD, payload: leaderboard }));
            }
        });
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