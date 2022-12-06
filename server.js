//import
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")


// create express app
const app = express()


// establish mongo connection
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASEURL)

// mongoose connection events
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))


//register middlware
app.use(morgan("dev"))
app.use("static", express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

// Routes and Routers
app.get("/", (req, rest) => {
    rest.send("<h1>Server is Working</h1>")
})


// start server 
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))