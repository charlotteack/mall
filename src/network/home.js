import {require} from "./require";
//首页所有请求

export function getHomeMultidata() {
  return require({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return require({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
