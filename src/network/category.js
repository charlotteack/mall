import {require} from "./require";

export function getCategoryTitles() {
  return require({
    url: '/category/title'
  })
}

export function getCategoryGoods(bigType,smallType) {
  return require({
    url: '/category/data',
    params: {
      bigType,
      smallType
    }
  })
}


