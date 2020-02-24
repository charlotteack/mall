import {require} from "./require";

export function getDetail(iid) {
  return require({
    url: '/detail',
    params: {
      iid
    }
  })
}
