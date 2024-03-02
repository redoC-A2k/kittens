import { clientMap, wsServer } from '..'
import { client } from '../client'
import { Request, Response } from 'express'
import constants from '../constants'
import { WebSocket } from 'ws'

const wonGame = async (req: Request, res: Response) => {
    const { username } = req.params
    try {
        let score = await client.ZINCRBY('leaderboard', 1, `user:${username}`);
        let leaderboard = await client.zRangeWithScores('leaderboard', 0, 9, {
            REV: true
        })
        wsServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: constants.LATEST_LEADERBOARD, payload: leaderboard }))
            }
        })
        res.status(200).json(score)
    } catch (error) {
        console.log("Error while updating user points : ", error)
        res.status(500).json("Error while updating user points")
    }
}

const getLeaderboard = async (req: Request, res: Response) => {
    try {
        let leaderboard = await client.zRangeWithScores('leaderboard', 0, 9, {
            REV: true
        })
        res.status(200).json(leaderboard)
    } catch (error) {
        console.log("Error while fetching leaderboard : ", error)
        res.status(500).json("Error while fetching leaderboard")
    }
}

const getScore = async (req: Request, res: Response) => {
    const { username } = req.params
    try {
        let score = await client.zScore('leaderboard', `user:${username}`)
        res.status(200).json(score)
    } catch (error) {
        console.log("Error while fetching user score : ", error)
        res.status(500).json("Error while fetching user score")
    }
}

export default { wonGame, getLeaderboard, getScore}