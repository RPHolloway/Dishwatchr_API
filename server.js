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

// Get new dishwasher id
// Just remember we borrowed this from GitHub...somewhere.
var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return Math.random().toString(36).substr(2, 9);
};
// Actual route
app.get('/api/house', function(req, res) {
    // WAIT - check to make sure this doesn't already exist in the database
    var username = ID();
    res.send(username);
});

// Get status of dishwasher
// JSON definition
// Code (String): psyem6zlm
// Status (String): Clean/Dirty 
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

// Toggle status of dishwasher
app.get('/api/:house/:dishwasher/toggle', function(req, res) {
    // 
    var currentStatus = req.status
    if(currentStatus === 'inactive')
        currentStatus = 'active'
    else if(currentStatus === 'active')
        currentStatus = 'inactive'
    res.send(currentStatus);
})

// Get status of dishwasher pseudocode
// 1. Open app
// 2. Check for stored dishwasher ID
// 3. If no dishwasher ID
//      Do you want to create a new dishwasher ID? 
//          Yes - Create new dishwasher ID from server
//          No - type in dishwasher ID, store locally
// 4. Using new dishwasher ID or stored old dishwasher ID,
//    run GetStatusOfDishwasher from server, passing dishwasher
//    ID as parameter in function call
// 5. Display status

// start the node server
app.listen(port); 
console.log('Server started at: ' + port);

