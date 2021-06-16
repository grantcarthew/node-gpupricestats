export namespace Gumtree {
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
}

export interface GpuPriceData {
  dateTime: string
  count: number
  avgPrice: number
}
