module.exports = function(app)
{
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
}