const express = require("express");
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { router } = require("./router");
dotenv.config()

app.use('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, authorization, Accept, Authorization");
    next();
})

app.use(bodyParser.json());
app.use(router)
app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT)
})