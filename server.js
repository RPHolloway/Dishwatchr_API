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

//-- Get Dishwasher --//
//-- Update Dishwasher Info --//
//-- Toggle Dishwasher State --//

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
//      Do you want to create a new dishwasher ID? 
//          Yes - Create new dishwasher ID from server.
//          No - Main Menu will be empty :(
// 5. Get Dishwasher by ID from server.
// 6. Display status

// start the node server
app.listen(port); 
console.log('Server started at: ' + port);