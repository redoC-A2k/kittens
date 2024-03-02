"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientMap = exports.wsServer = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ws_1 = require("ws");
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./router"));
const socket_1 = require("./controllers/socket");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, authorization, Accept, Authorization");
    next();
});
app.use(body_parser_1.default.json());
app.use(router_1.default);
const server = app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});
exports.wsServer = new ws_1.WebSocket.Server({ noServer: true });
exports.clientMap = {};
server.on('upgrade', (request, socket, head) => {
    console.log("upgrade request received");
    exports.wsServer.handleUpgrade(request, socket, head, (webSocket) => {
        webSocket.send(JSON.stringify("Hello Client , Happy upgradding to WebSockets!"));
        exports.wsServer.emit('connection', webSocket, request);
    });
});
exports.wsServer.on('connection', (socket, request) => {
    if (request.url) {
        let username = new URL(request.url, `https://${request.headers.host}`).searchParams.get('username');
        if (username) {
            exports.clientMap[username] = socket;
        }
    }
    socket.on('message', (message, isBinary) => {
        (0, socket_1.handleMessages)(message, isBinary, socket);
    });
    socket.on('close', () => {
        console.log("Socket is closed");
    });
    socket.on('error', (err) => {
        console.log("Error while opening the socket", err);
    });
});
//# sourceMappingURL=index.js.map