// require packages
var express = require('express');
var app = express();
var port = process.env.PORT || 8080

// routes eventually go here
app.get('/api/users', function(req, res) {
    var user_id = req.param('id');
    var token = req.param('token');
    var geo = req.param('geo');

    res.send(user_id + ' ' + token + ' ' + geo);
});

//-- Create Dishwasher --//
//      Dishwasher:
//      {
//          id,
//          state,
//          model,
//          estimated wash time,
//      }
app.get('/api/house', function(req, res) {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    // Just remember we borrowed this from GitHub...somewhere.
    var houseId = Math.random().toString(36).substr(2, 9);

    // TODO - check to make sure this doesn't already exist in the database

    res.send(houseId);
});

//-- Get Dishwasher --//
// Get status of dishwasher
app.param('house', function(req, res, next, house) {
    // Add some stuff here to make sure that thing actually exists
    req.status = 'I don\'t know what you\'re talking about.'
    if(house === 'psyem6zlm')
        req.status = 'active'
    next();
})
app.get('/api/:house', function(req, res) {
    res.send(req.status);
})

//-- Update Dishwasher Info --//
//-- Toggle Dishwasher State --//
app.get('/api/:house/:dishwasher/toggle', function(req, res) {
    var currentStatus = req.status
    if(currentStatus === 'inactive')
        currentStatus = 'active'
    else if(currentStatus === 'active')
        currentStatus = 'inactive'
    res.send(currentStatus);
})

//-- Create User --//
//      User:
//      {
//          id,
//          username,
//          password
//          first name,
//          last name,
//      }

//-- Get User --//
//-- Update User Info --//

//-- Create House --//
//      House:
//      {
//          id,
//          name,
//          address,
//          password (optional),
//          dishwashers[],
//          users[],
//      }

//-- Get House --//
//-- Update House Info --//
//-- Add user to House --//
//-- Add Dishwasher to House --//

//*** 'Get Status of Dishwasher' ***//
// 1. Open app.
// 2. Check house membership status
//      Member of a house?
//          Yes - Load main menu.
//          No - Do you want to create a new house?
//              Yes - Create a new house w/ info.
//              No - Can't progress in app. Wait for user to decide 'yes'  .      
// 3. Check for stored dishwasher ID.
// 4. If no dishwasher ID.

// start the node server
app.listen(port); 
console.log('Server started at: ' + port);

