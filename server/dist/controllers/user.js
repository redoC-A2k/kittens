"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../repository/user"));
const loginUser = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await user_1.default.fetch(username);
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Error while fetching user");
    }
};
exports.default = { loginUser };
//# sourceMappingURL=user.js.map