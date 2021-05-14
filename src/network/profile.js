import {require} from "./require";

export function updateUserInfo(params) {
  return require({
    url: '/profile/update',
    params: params,
    method: 'post'
  })
}

export function uploadImage(data) {
  return require({
    url: '/profile/upload',
    data: data,
    method: 'post',
  })
}
