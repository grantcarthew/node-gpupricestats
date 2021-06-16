import { GumtreeQuery } from "./gumtree.js"
import { insertGpuData } from "./dynamodb.js";
const dateTime = (new Date()).toISOString()
const result = await GumtreeQuery()
const item = { dateTime, ...result };
await insertGpuData(item)

console.log('Data item', item);
