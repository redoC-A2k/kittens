const { Schema } = require('redis-om')


const userSchema = new Schema('user', {
    cards:{
        type:'string[]',
        required:true
    },
    diffuseCards:{
        type:'string[]',
        required:true
    },
    points:{
        type:'number',
    }
})

module.exports = {userSchema}
