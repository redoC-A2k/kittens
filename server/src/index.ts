import express from 'express'
import dotenv from 'dotenv'
import { WebSocket } from 'ws'
import bodyParser from 'body-parser';
import router  from './router'
import {handleMessages} from './controllers/socket'
dotenv.config()

const app = express()

app.use('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, authorization, Accept, Authorization");
    next();
})

app.use(bodyParser.json());
app.use(router)

const server = app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT)
})

const wsServer = new WebSocket.Server({ noServer: true })

server.on('upgrade', (request, socket, head) => {
    console.log("upgrade request received")
    wsServer.handleUpgrade(request, socket, head, (webSocket) => {
        webSocket.send(JSON.stringify("Hello Client , Happy upgradding to WebSockets!"))
        wsServer.emit('connection', webSocket, request)
    })
})

wsServer.on('connection', (socket: WebSocket, request) => {
    socket.on('message', (message: String, isBinary: boolean) => {
        handleMessages(message, isBinary, socket)
    })
    socket.on('close', () => {
        console.log("Socket is closed")
    })
    socket.on('error', (err) => {
        console.log("Error while opening the socket", err)
    })
})