import fetch, { Response } from "node-fetch"
import config from "./config.js";
import { insertGpuData } from "./dynamodb.js";
import { Gumtree, Source } from "./types"

export async function gumtreeQuery() {

  console.log("Gumtree GPU Price Query");

  let pageUrl: string = config.urls.gumtree;
  const dateTime = (new Date()).toISOString()
  const source: Source = "gt";
  const { filterWords }: { filterWords: Array<string> } = config;

  console.log("Getting first page...");
  let res: Response
  let jsonResult: Gumtree.QueryResult
  try {
    res = await fetch(pageUrl);
    jsonResult = await res.json();
  } catch (err) {
    console.log('The following error occured when sending Gumtree REST request:');
    console.error(err);
    return
  }
  let resultList = jsonResult.data.results.resultList;
  const totalPages: number = 0 + jsonResult.data.pager.lastPageNum;

  console.log(`Reported count: ${jsonResult.data.pager.numFound}`);
  console.log(`Number of pages: ${totalPages}`);

  let pageString = "pageNum=1";

  if (totalPages > 1) {
    for (let i = 2; i <= totalPages; i++) {
      const newPageString = pageString.replace(`${i - 1}`, `${i}`);
      pageUrl = config.urls.gumtree.replace(pageString, newPageString);

      pageString = newPageString;
      console.log(`Getting page: ${i}`);

      const res = await fetch(pageUrl);
      const result = await res.json();
      resultList = [...resultList, ...result.data.results.resultList];
    }
  }

  console.log("Count before word filter: " + resultList.length);
  resultList = resultList.filter(filter);
  console.log("Count after word filter: " + resultList.length);

  let totalPrice = 0
  for (const advert of resultList) {
    totalPrice += +advert.priceText.replace(/\D/g, '')
  }
  const avgPrice = Math.round(((totalPrice / resultList.length) + Number.EPSILON) * 100) / 100


  function filter(advert: Gumtree.Advert) {
    for (const word of filterWords) {
      if (advert.title.toUpperCase().includes(word)) return false;
    }
    return true;
  }

  const item = { dateTime, source, avgPrice, count: resultList.length };
  console.log('Gumtree GPU data item:', item);
  await insertGpuData(item)
}
