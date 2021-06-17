import { DynamoDBClient, PutItemCommandInput, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { GpuPriceData } from "./types"
import config from "./config.js"

export const dbClient = new DynamoDBClient({ region: "ap-southeast-2" });

export async function insertGpuData(gpuPriceData: GpuPriceData) {
	const params: PutItemCommandInput = {
		TableName: config.tableName,
		Item: {
			dateTime: { S: gpuPriceData.dateTime },
			source: { S: gpuPriceData.source },
			count: { N: "" + gpuPriceData.count },
			avgPrice: { N: "" + gpuPriceData.avgPrice },
		},
	};

	try {
		const data = await dbClient.send(new PutItemCommand(params));
		if (data?.$metadata?.httpStatusCode != 200) { throw data }
		const httpStatusCode = data?.$metadata?.httpStatusCode;
		const requestId = data?.$metadata?.requestId;
		console.log('GPU price data inserted successfully:', { httpStatusCode, requestId });
		return data;
	} catch (err) {
		console.log('The following error occured whilst inserting GPU price data into DynamoDB:');
		console.error(err);
	}
}