require("dotenv").config()
require("./app/config/connection")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const path = require("path")


app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}))
app.use(express.json())

const PORT = process.env.APP_PORT

app.listen(PORT, ()=> {
    console.log(`App is running on localhost:${PORT}`)
})

require("./app/routes")(app)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'))
})