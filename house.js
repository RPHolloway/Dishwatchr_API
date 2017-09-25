var AWS = require("aws-sdk")

AWS.config.update({
    accessKeyId: "AKIAIH3HQXDW4QUB25YQ",
    secretAccessKey: "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", 
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: "Houses",
    KeySchema: [
        {AttributeName: "id", KeyType: "HASH"},
        {AttributeName: "housename", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
        {AttributeName: "id", AttributeType: "S"},
        {AttributeName: "housename", AttributeType: "S"}
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
}

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
})