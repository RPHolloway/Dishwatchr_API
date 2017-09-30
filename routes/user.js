module.exports = function(app)
{
    // require packages
    var AWS = require('aws-sdk')
    var AmazonCognitoIdentity = require('../node_modules/aws-sdk/dist/amazon-cognito-identity.min.js')
    var config = require('config')

    var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
    
    AWS.config.region = 'us-east-2';
    var poolData = {
        UserPoolId : config.get('AWS.UserPool.UserPoolId'), // your user pool id here
        ClientId : config.get('AWS.UserPool.ClientId') // your app client id here
    };
    var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData)

    /*var user = {
        id: 0,
        username: '',
        password: '',
        firstname: '',
        lastname: ''
    }*/
    //-- Create User --//
    //-- Update User Info --//
    app.post('/api/user', function(req, res) {
        user = req.body

        var attributeList = [];
        
            var dataAddress = {
                Name : 'address',
                Value : user.address
            };
        
            var dataFirstname = {
                Name : 'given_name',
                Value : user.firstname
            };
        
            var dataFamilyname = {
                Name : 'family_name',
                Value : user.lastname
            };
        
            var dataUsername = {
                Name : 'preferred_username',
                Value : user.username
            };

        
            var attributeAddress = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(dataAddress);
            attributeList.push(attributeAddress);
        
            var attributeFirstname = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(dataFirstname);
            attributeList.push(attributeFirstname);
        
            var attributeLastname = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(dataFamilyname);
            attributeList.push(attributeLastname);
        
            var attributeUsername = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(dataUsername);
            attributeList.push(attributeUsername);
        
            userPool.signUp(user.email, user.password, attributeList, null, function(err, result){
                if (err) {
                    res.send(err)
                    return;
                }
                cognitoUser = result.user;
                res.send(cognitoUser.getUsername())
            });
    });

    app.post('/api/user_verify', function(req, res) {
        user = req.body
        
        var userData = {
            Username : user.email,
            Pool : userPool
        };
        
        var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
        cognitoUser.confirmRegistration(user.verificationCode, true, function(err, result) {
            if (err) {
                res.send(err)
                return;
            }
            res.send(result);
        });
    });

    app.post('/api/user_authenticate', function(req, res) {
        user = req.body

        var authenticationData = {
            Username : user.email,
            Password : user.password,
        };

        var authenticationDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        var userData = {
            Username : authenticationData.Username,
            Pool : userPool
        };

        var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {

                var loginsCognitoKey = config.get('AWS.FederatedIdentity.LogInKey')
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId : config.get('AWS.FederatedIdentity.IdentityPoolId'), // your identity pool id here
                    Logins : {
                        // Change the key below according to the specific region your user pool is in.
                        [loginsCognitoKey] : result.getIdToken().getJwtToken()
                    }
                });

                var docClient = new AWS.DynamoDB.DocumentClient();

                var params = {
                    TableName: "Houses",
                     Item: {
                        "id": "abc123",
                        "housename": "Chamberlain"
                    }
                }
                docClient.put(params, function(err, data) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send(data)
                    }
                });
            },
    
            onFailure: function(err) {
                res.send(err)
            },
    
        });
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