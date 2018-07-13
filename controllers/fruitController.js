const express = require('express');

// next we set up the Router. A controller is a router, which tells things what to do. router is a method on top of the express module. the router allows us to create get, post, put, patch, & delete requests.

//your controller deals with one model. In this case, it's just dealing with the model Fruits.

const router = express.Router();

const Fruits = require('../models/fruits'); //Require the model Fruits.
// .. is to back out the folder you're in. then go into models.
//  . is on the same level.
// Remember Model is a representation of our data. The model should be capitalized.

//---------------------------   GET ROUTES  ----------------------------------
//                       this gets all the fruits.

//THIS IS localhost:3000/fruits. This shows the whole model
router.get('/', (req, res) => {
  Fruits.find({}, (err, allFruits) => {
    //finding every fruit without a search parameter
    if (err) {
      res.send(err);
    } else {

      //allFruits is the response from our db. When you are finding all of something it returns an array.
      res.render('index.ejs', {
        fruits: allFruits
      });
    }
  });
});

// #2 CHECK (INDEX #S OF OBJECT). This
// router.get('/fruits:index', (req, res) => {
//   res.send(Fruits[req.params.index]) //capital F b.c it's a model.
// });


//--------------------   router.POST TO MAKE A NEW ROUTE ----------------------

// router.post will post the data up onto the page.
router.post('/', (req, res) => {

  // grab the info from req.body and push it into the model. req.body is an object. the model is an array.
  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  //adding the contents of the form to the model. the collection is in the database. This checks if we actually get a response.
  Fruits.create(req.body, (err, createdFruit) => {
    if (err) {
      console.log(err)
      res.send(err);
    } else {
      console.log(createdFruit)
      //we want to respond to the client after we get the response from the database.
      res.redirect('/fruits'); //res.redirect redirects the user back to whatever you write in the ('/...').
    }
  });
});



//---------------------  router.GET TO MAKE A NEW ROUTE -----------------------
//Create our new route above the index route. the order is important.
//THIS PAGE IS localhost:3000/fruits/new
router.get('/new', (req, res) => {
  //this is
  res.render('new.ejs')
});



//------------------------------ ROUTES -------------------------------------

//------------------------------ EDIT ROUTE ---------------------------------

//to display a single fruit (this is why it's fruit: Fruits)

router.get('/:id/edit', (req, res) => {
  //^^^ when you want to grab this out, you use req.params

  Fruits.findById(req.params.id, (err, foundFruit) => {

    res.render('edit.ejs', {
      fruit: foundFruit //finds one fruit
      // index: req.params.index
    });
  });
});


//------------------------------ SHOW ROUTE ---------------------------------
//THIS PAGE IS localhost:3000/fruits/0 /1 or /2


// Show Route
router.get('/:id', (req, res) => {

  // Render is when you want to send
  // an ejs template to the client
  Fruits.findById(req.params.id, (err, foundFruit) => {

    if(err){
      console.log(err, ' this is error in delete');
      res.send(err);
    } else {
//check to see if it is updating correctly.
  // console.log(deletedFruit, ' this is the deletedFruit in the delete route');

      res.render('show.ejs', {
      fruit: foundFruit// This creates
      // a "fruit" variable in the show page
    })
  }
  })
});


// router.get('/:id', (req, res) => {
//   //index is capturing any text that you write after /fruits.
//
//   Fruits.findById(req.params.id, (err, foundFruit) => {
//
//   res.render('show.ejs', {
//     fruit: foundFruit
//     // console.log(req.params, ' this is req.params');
//     //Fruits is capitalized b.c it's the model.
//     //reck dot params grabs everything after the slash. it is the property. The value of reck dot params is whatever is written after it. so 0: routerle 1: pear 2: banana. those are in your parameter.
//     //this creates a 'fruit' variable  in the show page
//   });
// });
// });

//---------------------------- PUT / UPDATE ROUTE -----------------------------

router.put('/:id', (req, res) => {
  console.log(' am I hitting the put route');
  //check to see if I'm hitting the route. If I'm not hitting the route, there's probably something wrong with the action of my form.

  //If it is hitting the route, I want to see what req.body is.
  console.log(req.body); //this will give me the info that is coming from the form.



  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  // const num = [1, 2, 3];
  // num[1] = 4; //now 2 will be 4.
  // same idea for Fruits[req.params.index] = req.body
  // Fruits[req.params.index] = req.body;


//req.body is the updated form info.
// new: true says return to me the updated object. by default it is false.
//things that are default you don't have to specify.

//1st arg: document you are look for.
//2nd arg: content you updating it with.
  Fruits.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedFruit) => {
    if(err){
      res.send(err);
    } else {
//check to see if it is updating correctly.
  console.log(updatedFruit, 'check our model');
  //check to see if it is updating correctly.
  res.redirect('/fruits');
}
})
});


//------------------------------ DELETE ROUTE ---------------------------------
router.delete('/:id', (req, res) => {
  console.log('req.body');
  // Fruits.splice(req.params.id, 1); //fruits.splice won't work bc it's not an array any more.

  //you were saying:
  //index is [i] in the array. so you're saying req.params.index, delete 1 space.

  //array method. it splices (removes) off items from an array.
  // arr.splice(start, delete count)  ex: 0 starts at 0, 1 would just delete 1 item, to the right of where you put. ex: ['hi', 'hello', 'howdy'] 1, 1 would be return ['hi', 'hello'] b.c you started at hello (index 1) and deleted 1 off the array (howdy)


  Fruits.findByIdAndDelete(req.params.id, (err, deletedFruit) => {
    if(err){
      console.log(err, ' this is error in delete');
      res.send(err);
    } else {
//check to see if it is updating correctly.
  console.log(deletedFruit, ' this is the deletedFruit in the delete route');
  //check to see if it is updating correctly.
  res.redirect('/fruits');
}
})
});


// router.get('/fruitsSubmit', (req, res) => {
// res.render('index.ejs', { //1st parameter
//   fruits: Fruits}); //2nd parameter, which is an object. do not need: [req.params.index]
// });


module.exports = router;
