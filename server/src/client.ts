import { createClient } from 'redis'
import dotenv from 'dotenv'

// dotenv.config({ path: __dirname+'/.env' })
dotenv.config()

const client = createClient({
    url: process.env.REDIS_CLI_URL,
});

client.on('error', (err) => {
    console.log("Error in redis : ", err)
})

async function connect() {
    if (client)
        await client.connect();
}

try {
    connect();
    // await client.ft.create('idx:points'
} catch (error) {
    console.log("Error while connecting : ", error)
}

export { client }
