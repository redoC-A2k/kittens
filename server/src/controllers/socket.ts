import { SocketMessage } from "../types"
import constants from '../constants'
import { WebSocket } from 'ws'

export const handleMessages = async (message: String, isBinary: boolean, socket: WebSocket) => {
    message = message.toString()
    let obj: SocketMessage = JSON.parse(message as string)
    switch (obj.type) {
        case constants.UPDATE_LEADERBOARD:
            console.log("Leaderboard updated")
            break;
        default:
            console.log("Unknown message type")
            break;
    }
}