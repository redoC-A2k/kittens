"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessages = void 0;
const constants_1 = __importDefault(require("../constants"));
const client_1 = require("../client");
const handleMessages = async (message, isBinary, socket) => {
    message = message.toString();
    let obj = JSON.parse(message);
    try {
        switch (obj.type) {
            case constants_1.default.GET_LEADERBOARD:
                let leaderboard = await client_1.client.zRangeWithScores('leaderboard', 0, 9, {
                    REV: true
                });
                socket.send(JSON.stringify({ type: constants_1.default.LATEST_LEADERBOARD, payload: leaderboard }));
                break;
            default:
                console.log("Unknown message type");
                break;
        }
    }
    catch (error) {
        console.log("Error in processing message : ", error);
    }
};
exports.handleMessages = handleMessages;
//# sourceMappingURL=socket.js.map