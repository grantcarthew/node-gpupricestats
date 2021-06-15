import DynamoDBClient from "aws-sdk/clients/dynamodb";
const dbClient = new DynamoDBClient({ region: "ap-southeast-2" });
export { dbClient };