"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
// dotenv.config({ path: __dirname+'/.env' })
dotenv_1.default.config();
const client = (0, redis_1.createClient)({
    url: process.env.REDIS_CLI_URL,
});
exports.client = client;
client.on('error', (err) => {
    console.log("Error in redis : ", err);
});
async function connect() {
    if (client)
        await client.connect();
}
try {
    connect();
    // await client.ft.create('idx:points'
}
catch (error) {
    console.log("Error while connecting : ", error);
}
//# sourceMappingURL=client.js.map