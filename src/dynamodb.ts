import { DynamoDBClient, PutItemCommandInput, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { GpuPriceData } from "./types"
import config from "./config.js"

export const dbClient = new DynamoDBClient({ region: "ap-southeast-2" });

export async function insertGpuData(gpuPriceData: GpuPriceData) {
	const params: PutItemCommandInput = {
		TableName: config.tableName,
		Item: {
			dateTime: { S: gpuPriceData.dateTime },
			count: { N: "" + gpuPriceData.count },
			avgPrice: { N: "" + gpuPriceData.avgPrice },
		},
	};

	try {
		const data = await dbClient.send(new PutItemCommand(params));
		console.log(data);
		return data;
	} catch (err) {
		console.error(err);
	}
}