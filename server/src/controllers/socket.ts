import { SocketMessage } from "../types"
import constants from '../constants'
import { WebSocket } from 'ws'
import { client } from '../client'


export const handleMessages = async (message: String, isBinary: boolean, socket: WebSocket) => {
    message = message.toString()
    let obj: SocketMessage = JSON.parse(message as string)
    try {
        switch (obj.type) {
            case constants.GET_LEADERBOARD:
                let leaderboard = await client.zRangeWithScores('leaderboard', 0, 9, {
                    REV: true
                })
                socket.send(JSON.stringify({ type: constants.LATEST_LEADERBOARD, payload: leaderboard }))
                break;
            default:
                console.log("Unknown message type")
                break;
        }
    } catch (error) {
        console.log("Error in processing message : ", error)
    }
}