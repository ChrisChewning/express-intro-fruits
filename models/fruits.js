const fruits = [
    {
        name:'apple',
        color: 'red',
        readyToEat: true
    },
    {
        name:'pear',
        color: 'green',
        readyToEat: false
    },
    {
        name:'banana',
        color: 'yellow',
        readyToEat: true
    }
];

//exporting the whole fruits array and it will be named whatever we reaquire as.

//step 2: go to your server.js - fruits-express file and require our model. 

module.exports = fruits;
