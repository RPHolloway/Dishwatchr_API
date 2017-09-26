var AWS = require("aws-sdk")

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

drop()
create()

function drop() {
    var params = {
        TableName: "Users"
    }

    dynamodb.deleteTable(params, function(err, data) {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2))
        } else {
            console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2))
        }
    })
}

function create() {
    var params = {
        TableName: "Users",
        KeySchema: [
            {AttributeName: "id", KeyType: "HASH"},
            {AttributeName: "username", KeyType: "RANGE"}
        ],
        AttributeDefinitions: [
            {AttributeName: "id", AttributeType: "S"},
            {AttributeName: "username", AttributeType: "S"}
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    }

    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2))
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2))
        }
    })
}