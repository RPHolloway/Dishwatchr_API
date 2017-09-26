module.exports = function(app)
{
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
}