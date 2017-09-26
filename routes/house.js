module.exports = function(app)
{
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
}