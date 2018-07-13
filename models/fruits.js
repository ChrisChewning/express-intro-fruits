
//-------------------------------  OLD WAY  -------------------------------
// const fruits = [
//     {
//         name:'apple',
//         color: 'red',
//         readyToEat: true
//     },
//     {
//         name:'pear',
//         color: 'green',
//         readyToEat: false
//     },
//     {
//         name:'banana',
//         color: 'yellow',
//         readyToEat: true
//     }
// ];


//------------------------------- SCHEMA -------------------------------

const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  name: String,
  color: String,
  readyToEat: Boolean
});




//this model will be what allows us to talk to mongodb
//we're saying we want our documents in the database to look like the schema way.
// mongoose injects your model into mongodb
// first argument will be the name of your mongo collection
// second will be what those documents look like
module.exports = mongoose.model('Fruit', fruitSchema);
