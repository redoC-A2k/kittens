import userRepository from '../repository/user'
import { Request, Response } from 'express'

const loginUser = async (req: Request, res: Response) => {
    const { username } = req.body
    try {
        const user = await userRepository.fetch(username)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json("Error while fetching user")
    }
}

export default { loginUser }