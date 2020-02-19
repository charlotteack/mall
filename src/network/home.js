import {require} from "./require";
//首页所有请求

export function getHomeMultidata() {
  return require({
    url: '/home/multidata'
  })
}
