
//////////////////////////////////////////////
//////// Stars Model
///////////////////////////////////////////////
const mongoose = require('./connection')

const { Schema, model } = mongoose // destructuring, grabbing model and Schema off mongoose variable
// mongoose.Schema
// mongoose.model


const starsSchema = new  Schema({
    name: String,
    age: String,
    deceased: Boolean,
    username: String,
    img: String
})

const Star = model('Star', starsSchema)

module.exports = Star

