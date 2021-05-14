import {require} from "./require";

export function addOrder(order) {
  return require({
    url: '/shop/addOrder',
    params: {
      order
    },
    method: 'post'
  })
}

export function getAllOrder(phone) {
  return require({
    url: '/profile/getUserOrder',
    params: {
      phone
    },
    method: 'post'
  })
}

export function deleteOrder(orderId) {
  return require({
    url: '/shop/deleteOrder',
    params: {
      orderId
    },
  })
}

export function payOrder(orderId) {
  return require({
    url: '/profile/pay',
    params: {
      orderId
    },
  })
}

export function receiveOrder(orderId) {
  return require({
    url: '/profile/receive',
    params: {
      orderId
    },
  })
}




