import { GumtreeQuery } from "./gumtree.js"
const now = new Date()
const result = await GumtreeQuery()
const item = { date: now.toISOString(), ...result };
console.log('Data item', item);
