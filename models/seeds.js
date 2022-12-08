require('dotenv').config()
const mongoose = require('./connection')
const Star = require('./star')


mongoose.connection.on('open', () => {

    // define data we want to put in the database
    const startingFruits =  [
        { name: "Michael Jackson", age: "51", deadOrAlive: dead },
        { name: "Whitney Housten", age: "51", deadOrAlive: dead },
        { name: "Brittany Spears", age: "51", deadOrAlive: alive},
        { name: "Biggie Smalls", age: "51", deadOrAlive: dead },

      ]
      
      // Delete all stars
      Star.deleteMany({}, (err, data) => {
        // Create new stars once old stars are deleted
        Star.create(startingStars, (err, data) =>{

            console.log(data)
            mongoose.connection.close();
            
        })

      })
      
})
