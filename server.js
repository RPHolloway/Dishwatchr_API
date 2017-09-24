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

// start the node server
app.listen(port); 
console.log('Server started at: ' + port);