require('dotenv').config()
const mongoose = require('./connection')
const Star = require('./star')


mongoose.connection.on('open', () => {

    // define data we want to put in the database
    const startingFruits =  [
        { name: "Michael Jackson", age: "51", deceased: true },
        { name: "Whitney Housten", age: "51", deceased: true },
        { name: "Brittany Spears", age: "51", deceased: false},
        { name: "Biggie Smalls", age: "51", deceased: true },

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
