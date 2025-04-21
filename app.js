const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config/db')
const cors = require('cors')
const account = require('./routes/account')

app = express()
app.use(cors())
app.use(bodyParser.json())
app.listen(4545, ()=>{
    console.log("running on port 4545");
})

app.use(bodyParser.json())
mongoose.connect(config.db) .then(()=>{
    console.log("Connected to db")
})
    .catch(()=>{
        console.log("Connection failed!")
    })

app.use("/account", account)
