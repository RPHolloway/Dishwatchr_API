// require packages
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

var port = process.env.PORT || 8080

//-- Timestamp Request --//
router.use(function(req, res, next){
    date = new Date(Date.now());
    req.timestamp = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+" "+
                    date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    next();
})

// 
// Dishwasher
//

var DishwasherState = {
    CLEAN: 0,
    WASHING: 1,
    DIRTY: 2
}

var dishwasher = {
    id: 0,
    state: DishwasherState.CLEAN,
    model: '',
    estimatedWashTime: 0,
    lastUpdate: 0
}

//-- Create Dishwasher --//
//-- Update Dishwasher Info --//
app.post('/api/dishwasher', function(req, res) {
    dishwasher = req.body
    result = null

    // No dishwasher in request
    if(dishwasher.id === 0)
    {
        do {
            // Generate new ID
            // Math.random should be unique because of its seeding algorithm.
            // Convert it to base 36 (numbers + letters), and grab the first 9 characters
            // after the decimal.
            // Just remember we borrowed this from GitHub...somewhere.
            id = Math.random().toString(36).substr(2, 9)
        } while (false /* TODO - check to make sure this doesn't already exist in the database*/)

        // TODO - submit new dishwasher information to DB

        dishwasher.id = id
        dishwasher.lastUpdate = req.timestamp
        result = dishwasher
    } else {     
        if(false /* TODO - check if dishwasher ID exists in DB*/) {
            // TODO - submit update to DB
        } else {
            // Client needs to request an ID first
            result = null
        }
    }

    console.log(JSON.stringify(result, null, 2))
    res.send(result)
});

//-- Get Dishwasher --//
app.param('dishwasher_id', function(req, res, next, dishwasher_id) {
    result = null

    // TODO - get dishwasher from DB

    req.dishwasher = result

    next();
})
app.get('/api/dishwasher/:dishwasher_id', function(req, res) {
    res.send(req.status);
})

//-- Toggle Dishwasher State --//
app.get('/api/:house_id/:dishwasher_id/toggle', function(req, res) {

    switch(req.dishwasher.state)
    {
        case DishwasherState.CLEAN:
            req.dishwasher.state = DishwasherState.DIRTY
            break;

        case DishwasherState.CLEAN:
            req.dishwasher.state = DishwasherState.WASHING
            break;

        case DishwasherState.CLEAN:
            req.dishwasher.state = DishwasherState.CLEAN
            break;

        default:
            // TODO - Uh Oh!
            break;
    }

    req.dishwasher.lastUpdate = req.timestamp

    console.log(JSON.stringify(req.body, null, 2))
    res.send(JSON.stringify(req.body, null, 2));
})

//
// User
//

var user = {
    id: 0,
    username: '',
    password: '',
    firstname: '',
    lastname: ''
}
//-- Create User --//
//-- Update User Info --//
app.post('/api/user', function(req, res) {
    user = req.body.user
    result = null

    // No user in request
    if(user.id === 0)
    {
        do {
            // Generate new ID
            // Math.random should be unique because of its seeding algorithm.
            // Convert it to base 36 (numbers + letters), and grab the first 9 characters
            // after the decimal.
            // Just remember we borrowed this from GitHub...somewhere.
            id = Math.random().toString(36).substr(2, 9)
        } while (false /* TODO - check to make sure this doesn't already exist in the database*/)

        // TODO - submit new user information to DB

        user.id = id
        user.lastUpdate = req.timestamp
        result = user
    } else {     
        if(false /* TODO - check if user ID exists in DB*/) {
            // TODO - submit update to DB
        } else {
            // Client needs to request an ID first
            result = null
        }
    }

    console.log(JSON.stringify(result, null, 2))
    res.send(result)
});

//-- Get User --//
app.param('user_id', function(req, res, next, user_id) {
    result = null

    // TODO - get user from DB

    req.user = result

    next();
})
app.get('/api/user/:user_id', function(req, res) {
    res.send(req.status);
})

//
// House
//

var house = {
    id: 0,
    name: '',
    address: '',
    password: '',
    dishwasher_ids: [{
        id: 0,
    }],
    user_ids: [{
        id: 0,
    }]
}
//-- Create House --//
//-- Update House Info --//
app.post('/api/house', function(req, res) {
    house = req.body.house
    result = null

    // No house in request
    if(house.id === 0)
    {
        do {
            // Generate new ID
            // Math.random should be unique because of its seeding algorithm.
            // Convert it to base 36 (numbers + letters), and grab the first 9 characters
            // after the decimal.
            // Just remember we borrowed this from GitHub...somewhere.
            id = Math.random().toString(36).substr(2, 9)
        } while (false /* TODO - check to make sure this doesn't already exist in the database*/)

        // TODO - submit new house information to DB

        house.id = id
        house.lastUpdate = req.timestamp
        result = house
    } else {     
        if(false /* TODO - check if house ID exists in DB*/) {
            // TODO - submit update to DB
        } else {
            // Client needs to request an ID first
            result = null
        }
    }

    console.log(JSON.stringify(result, null, 2))
    res.send(result)
});

//-- Get House --//
app.param('house_id', function(req, res, next, house_id) {
    result = null

    // TODO - get house from DB

    req.house = result

    next();
})
app.get('/api/house/:house_id', function(req, res) {
    res.send(req.status);
})

//-- Add User to House --//
app.post('/api/house/:house_id/addUser', function(req, res) {
    req.house.user_ids.push()

    res.send(req.status);
})
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

