const { createClient } = require('redis')
require('dotenv').config()

const client = createClient({
    url:process.env.REDIS_CLI_URL,
});

client.on('error', (err) => {
    console.log("Error while connecting to redis : ", err)
})

async function connect() {
    if(client)
    await client.connect();
}
// creating index if it doesn't exists
try {
    connect();
    // await client.ft.create('')
} catch (error) {
    console.log("Error while creating index : ", error)
}

module.exports = { client }