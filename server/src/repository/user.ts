import { Repository } from 'redis-om';
import { userSchema } from '../models/user'
import { client } from '../client'
const userRespository = new Repository(userSchema, client)
export default userRespository;