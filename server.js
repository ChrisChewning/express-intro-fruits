//---------------------  REVIEW FROM MONDAY STARTS  -------------------------

//---------------------  Access Each Fruit Separately  --------------------
// localhost:3000/fruits/0 --> apple
// localhost:3000/fruits/1 --> banana
// localhost:3000/fruits/2 --> pear
//
// const fruits = ['apple', 'banana', 'pear'];

// //to get all 3 fruits and the brackets in one array...
// // app.get('/fruits', (req, res) => {
// //   res.send(fruits);
// // })
//
// //to get each fruits. the /:index is acting as a variable.
// app.get('/fruits/:index', (req, res) => {
//   // console.log(req.paams)
//    res.send(fruits[req.params.index]);
// });

// //-----------------------------MVC--------------------------------- https://git.generalassemb.ly/WebDev-Connected-Classroom/url_and_query_params/blob/master/README.md
// // MVC = Models, View, Controllers
// //the fruits array is the model.
// //the view is what we send to the client.
// //the controllers is what?

// //-----------------------------REQUIRE OUR MODEL--------------------
//require our Model. The model should be capitalized like Model.
// Our model/module is the fruit array from file fruits.js
//It should be capitalized as Model.
// this is our view for the server

//---------------------  REVIEW FROM MONDAY ENDS  ------------------------


//---------------------  REVIEW FROM TUESDAY STARTS  ------------------------

// body parser reads what's in a form.
// req.body only lives on the server.
// res.render is only for ejs templates.

//ANYTHING AFTER THE : use req.params.id or req/params.index or whatever word you want to access what's after the :

//use req.body to access what's in the form.

//EXAMPLE
// - the most common are  :/index or id...
// app.get('/pokemon/:id', (req, res) => { //:id is the same as :index. it's whatever is after the / in your browser.
//   res.render('show.ejs', {
//   pokemon: Pokemon[req.params.id] //has to match up with /:id. could be /:index and req.params.index.
// })
// });

// MVC
// model is the data.
// view is what we send to the client.
// controller is the glue b.w the model and the view. It tells the view what to send back to the controller and what to update in the model.

//methodOverride allows us to make a delete, put, or patch request.

//Our browser only allows get and post methods. methodOverride is a middleware. Middleware intercepts a request from the browser and before it makes its destination it does something to it.

//---------------------  REVIEW FROM TUESDAY ENDS  ------------------------



//--------------------------  GLOBAL VARIABLES  -----------------------------
//Set your variable names to require express and access express...
const express = require('express'); //make sure you've already init the express object.
const app = express(); //app is an object. our app variable as able to get all of the dependencies in express. that's why we can say app.get, app.post, app.delete, app.listen, etc.


// THESE ARE BELOW
// const bodyParser = require('body-parser');
// const methodOverride = require('method-override');


require('./db/db'); //folder is db and file is db


//----------------   BODY PARSER & methodOverride middleware  -----------------

//1. body parser and methodOverride are both middleware

//2. Body parser allows you to read the contents of the form through req.body.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

//3. APP.USE sets up what middleware you are using. Access the contents of the form in req.body. The body.parser allows us to see what’s in req.body. Body parser is middleware, which is basically a function that sits bw the client’s request and the final destination on the server.

//4. Here is a middleware example
//This sends the request to the next piece in the call stack (aka the next middleware piece or final route)
//app.use this on req, res, and next?
// app.use((req, res, next) => {
// next()
// });

// 5. methodOverride ALLOWS US TO USE DELETE AS A PATH

//include the method-override package (npm install method-override --save) in the server.js file. Example below...

//method-override reroutes the post route to a delete route.

//after router has been defined use methodOverride.  We'll be adding a query parameter to our delete form named _method.

//router.use means use one of the packages you've installed. this is middleware.
// app.use(methodOverride('_method'));


//-----------------------------  YOUR CONTROLLER  ----------------------------
//Require the controller after the middleware.
const fruitController = require('./controllers/fruitController');

//This means every route on the browser starts with /fruits so now it's /fruits/fruits

app.use('/fruits', fruitController);
///fruits is the 1st argument. every route now starts with /fruits.
//fruitController is what controller we're using.


//-----------------------------  SET A PORT  ----------------------------
app.listen(3000, () => {
  console.log('listening on port 3000');
})

//also an option...
// const port = 3000;
// app.listen(port, ()=> {
//   console.log('listening on port 3000');
// })
