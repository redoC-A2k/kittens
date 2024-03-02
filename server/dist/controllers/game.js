"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../repository/user"));
const setGameState = async (req, res) => {
    const { gameState } = req.body;
    const { username } = req.params;
    try {
        let user = await user_1.default.save(username, {
            cards: gameState.cards,
            diffuseCards: gameState.diffuseCards,
        });
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Error while saving game state");
    }
};
exports.default = { setGameState };
//# sourceMappingURL=game.js.map