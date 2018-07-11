const express = require('express');

// next we set up the Router. A controller is a router, which tells things what to do. router is a method on top of the express module. the router allows us to create get, post, put, patch, & delete requests.

//your controller deals with one model. In this case, it's just dealing with the model Fruits.

const router = express.Router();

const Fruits = require('../models/fruits'); //Require the model Fruits.
// .. is to back out the folder you're in. then go into models.
//  . is on the same level.
// Remember Model is a representation of our data. The model should be capitalized.

//---------------------------   GET ROUTES  ----------------------------------

//THIS IS localhost:3000/fruits. This shows the whole model
router.get('/', (req, res) => {
  res.render('index.ejs', {
    fruits: Fruits
// res.send(Fruits)?
});
});

// #2 CHECK (INDEX #S OF OBJECT). This
// router.get('/fruits:index', (req, res) => {
//   res.send(Fruits[req.params.index]) //capital F b.c it's a model.
// });


//------------------------   router.POST TO MAKE A NEW ROUTE ----------------------

// router.post will post the data up onto the page.
router.post('/', (req, res) => {

// grab the info from req.body and push it into the model. req.body is an object. the model is an array.
  if(req.body.readyToEat === 'on'){
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  //adding the contents of the form to the model.
  Fruits.push(req.body);

  console.log(req.body, 'this is req.body, should be form info');
  // res.send(Fruits)
  res.redirect('/fruits'); //res.redirect redirects the user back to whatever you write in the ('/...').
})

//-----------------------  router.GET TO MAKE A NEW ROUTE ------------------------
//Create our new route above the index route. the order is important.
//THIS PAGE IS localhost:3000/fruits/new
router.get('/new', (req, res) => {
  //this is
  res.render('new.ejs')
});



//------------------------------ ROUTES -------------------------------------

//------------------------------ EDIT ROUTE ---------------------------------

//to display a single fruit (this is why it's fruit: Fruits)

router.get('/:index/edit', (req, res) => {
res.render('edit.ejs', {
  fruit: Fruits[req.params.index],
  index: req.params.index
});
  // res.redirect('/fruits'); doesn't work.
});


//------------------------------ SHOW ROUTE ---------------------------------
//THIS PAGE IS localhost:3000/fruits/0 /1 or /2
router.get('/:index', (req, res) => {
  //index is capturing any text that you write after /fruits.
  res.render('show.ejs', {
  fruits: Fruits[req.params.index]
  // console.log(req.params, ' this is req.params');
  //Fruits is capitalized b.c it's the model.
  //reck dot params grabs everything after the slash. it is the property. The value of reck dot params is whatever is written after it. so 0: routerle 1: pear 2: banana. those are in your parameter.
  //this creates a 'fruit' variable  in the show page
})
});


//------------------------------ UPDATE ROUTE ---------------------------------

router.put('/:index', (req, res) => {
  console.log(' am I hitting the put route');
  //check to see if I'm hitting the route. If I'm not hitting the route, there's probably something wrong with the action of my form.

  //If it is hitting the route, I want to see what req.body is.
  console.log(req.body); //this will give me the info that is coming from the form.



  if(req.body.readyToEat === 'on'){
    req.body.readyToEat = true;
  } else {
      req.body.readyToEat = false;
    }
    // const num = [1, 2, 3];
      // num[1] = 4; //now 2 will be 4.
      // same idea for Fruits[req.params.index] = req.body
      Fruits[req.params.index] = req.body;
      console.log(Fruits, 'check our model');
      //check to see if it is updating correctly.
      res.redirect('/fruits');
});


//------------------------------ DELETE ROUTE ---------------------------------
router.delete('/:index', (req, res) => {
  console.log('hi');
	Fruits.splice(req.params.index, 1);
  //index is [i] in the array. so you're saying req.params.index, delete 1 space.

  //array method. it splices (removes) off items from an array.
// arr.splice(start, delete count)  ex: 0 starts at 0, 1 would just delete 1 item, to the right of where you put. ex: ['hi', 'hello', 'howdy'] 1, 1 would be return ['hi', 'hello'] b.c you started at hello (index 1) and deleted 1 off the array (howdy)


  //F not f b.c you are splicing off of the model.
  res.redirect('/fruits');  //redirect back to index route
});


// router.get('/fruitsSubmit', (req, res) => {
// res.render('index.ejs', { //1st parameter
//   fruits: Fruits}); //2nd parameter, which is an object. do not need: [req.params.index]
// });


module.exports = router;
