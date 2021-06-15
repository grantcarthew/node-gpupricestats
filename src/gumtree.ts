import fetch, { Response } from "node-fetch"
import config from "./config.js";
export interface QueryResult {
  data: Data;
}

export interface Data {
  pager: Pager;
  results: Results;
}

export interface Pager {
  numFound: number
  lastPageNum: number
}

export interface Results {
  resultList: Array<Advert>
}

export interface Advert {
  title: string
  priceText: string
}

export async function GumtreeQuery() {

  console.log("Gumtree GPU Status");

  let pageUrl: string = config.urls.gumtree;
  const { filterWords }: { filterWords: Array<string> } = config;

  console.log("Getting first page...");
  const res: Response = await fetch(pageUrl);
  const jsonResult: QueryResult = await res.json();
  let resultList = jsonResult.data.results.resultList;
  const totalPages: number = 0 + jsonResult.data.pager.lastPageNum;

  console.log(`Total number summary: ${jsonResult.data.pager.numFound}`);
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

  console.log("Total before filter: " + resultList.length);
  resultList = resultList.filter(filter);
  console.log("Total after filter: " + resultList.length);

  let total = 0
  for (const advert of resultList) {
    total += +advert.priceText.replace(/\D/g,'')
  }
  const avgPrice = Math.round(((total / resultList.length) + Number.EPSILON) * 100) / 100


  function filter(advert: Advert) {
    for (const word of filterWords) {
      if (advert.title.toUpperCase().includes(word)) return false;
    }
    return true;
  }

  return {
    avgPrice,
    count: resultList.length
  }
}
