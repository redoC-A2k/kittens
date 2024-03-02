"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_1 = __importDefault(require("./controllers/user"));
const game_1 = __importDefault(require("./controllers/game"));
const leaderboard_1 = __importDefault(require("./controllers/leaderboard"));
// ------------------- USER ------------------
router.post('/user/login', user_1.default.loginUser);
// ------------------- GAME -------------------
router.post('/game/:username', game_1.default.setGameState);
// ------------------- LEADERBOARD -------------------
// router.get('/leaderboard', game.getLeaderboard);
router.get('/game/won/:username', leaderboard_1.default.wonGame);
// router.get('/leaderboard', leaderboard.getLeaderboard);
router.get('/score/:username', leaderboard_1.default.getScore);
// ------------------- 404 -------------------
router.get('*', function (req, res) {
    res.status(404).json("Requested endpoint is not exposed from server");
});
router.post('*', function (req, res) {
    res.status(404).json("Requested endpoint is not exposed from server");
});
router.put('*', function (req, res) {
    res.status(404).json("Requested endpoint is not exposed from server");
});
router.delete('*', function (req, res) {
    res.status(404).json("Requested endpoint is not exposed from server");
});
exports.default = router;
//# sourceMappingURL=router.js.map