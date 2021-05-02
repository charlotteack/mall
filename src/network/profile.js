import {require} from "./require";

export function updateUserInfo(params) {
  return require({
    url: '/profile/update',
    params: params,
    method: 'post'
  })
}
