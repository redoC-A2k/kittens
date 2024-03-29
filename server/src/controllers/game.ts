import userRespository from "../repository/user"
import { Request, Response } from 'express'

const setGameState = async (req: Request, res: Response) => {
    const { gameState } = req.body
    const { username } = req.params
    try {
        let user = await userRespository.save(username, {
            cards: gameState.cards,
            diffuseCards: gameState.diffuseCards,
        })
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json("Error while saving game state")
    }
}
export default { setGameState }