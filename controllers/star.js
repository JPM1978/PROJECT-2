const express = require('express') // bring this in so we can make our router
const Star = require('../models/star')


/////
// Create Router  variable to attach rooutes
/////

const router = express.Router() // router will have all routes attached to it


//////////////////////////////////////////////
//////// Actual Routes
///////////////////////////////////////////////

// Authorization Middleware
router.use((req, res, next) => {
    console.log(req.session);
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect("/user/login");
    }
  });
  
// router.get('/seed', (req, res) => {
// })

router.get('/', (req, res) => {

    // Get all stars from mongo and send them back
    Star.find({ username: req.session.username } )
    .then((stars) => {
        // res.json(stars)
        res.render('stars/index.ejs', { stars, user:req.session.username });
    })
    .catch(err => console.log(err))

})

router.get('/new', (req, res) => {
    res.render('stars/new.ejs')
})

// create route
router.post("/", (req, res) => {
    // check if the deceased property should be true or false
    req.body.deceased = req.body.deceased === "on" ? true : false;
    // add username to req.body to track related user
    req.body.username = req.session.username
    // create the new star
    Star.create(req.body, (err, star) => {
      // redirect the user back to the main stars page after fruit created
      res.redirect("/stars");
    });
  });

router.get('/:id/edit', (req, res) => {

    const id = req.params.id
    // Find the star and send it to the edit.ejs  to prepopulate the form
    Star.findById(id, (err, foundStar) => {
        // res.json(foundStar)
        res.render('stars/edit.ejs', { star: foundStar })
    })
})

router.put('/:id', (req, res) => {
    
    req.body.deceased = req.body.deceased === 'on' ? true : false

    Star.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedStar) => {
        console.log(updatedStar)
        console.log(err)
        res.redirect(`/stars/${req.params.id}`)
        
    })
})

router.get('/:id', (req, res)=>{

    // Go and get star from the database
    Star.findById(req.params.id)
    .then((star)=> {
        res.render('stars/show.ejs', {star})
    })
})

router.delete('/:id', async (req, res) => {
    // Method 3 async await

    const deletedStar = await Star.findByIdAndDelete(req.params.id)

    if(deletedStar){
        res.redirect('/stars/')
    }
})

/////////////
///// export this router to use in other files
//////////////
module.exports = router
