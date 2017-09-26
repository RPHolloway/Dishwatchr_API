// require packages
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/dishwasher')(app)
require('./routes/user')(app)
require('./routes/house')(app)
require('./routes/house_user_bridge')(app)

app.use('/', router);

var port = process.env.PORT || 8080

//-- Timestamp Request --//
router.use(function(req, res, next){
    date = new Date(Date.now());
    req.timestamp = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+" "+
                    date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    next();
})

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

