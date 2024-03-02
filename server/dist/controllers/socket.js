"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessages = void 0;
const constants_1 = __importDefault(require("../constants"));
const handleMessages = async (message, isBinary, socket) => {
    message = message.toString();
    let obj = JSON.parse(message);
    switch (obj.type) {
        case constants_1.default.UPDATE_LEADERBOARD:
            console.log("Leaderboard updated");
            break;
        default:
            console.log("Unknown message type");
            break;
    }
};
exports.handleMessages = handleMessages;
//# sourceMappingURL=socket.js.map