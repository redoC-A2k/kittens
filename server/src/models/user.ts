import { Schema } from 'redis-om'

export const userSchema = new Schema('user', {
    cards:{
        type:'string[]',
    },
    diffuseCards:{
        type:'string[]',
    },
})


