require("dotenv").config()  // Load env variables
const express = require('express') // bring in express to make our app
const morgan = require('morgan') // nice logger for our request
const methodOverride = require('method-override') // allows us to override post request from our ejs/forms
const PORT = process.env.PORT 
const StarRouter = require('./controllers/star')
const UserRouter = require('./controllers/User');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const { response } = require("express")

const app = express()

//////////////////////////////////////////////
//////// Middlewares
///////////////////////////////////////////////

app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false,
  }))


// app.get('/', homeRoutes)
// app.get('/store', storeRoutes)
// app.get('/user', userRoutes)
app.use('/stars', StarRouter)
app.use('/user', UserRouter)

app.get('/', (req, res) => {
    res.render('index.ejs');

});

app.listen(PORT, ()=> console.log(`Server is workiong on: ${PORT}`))