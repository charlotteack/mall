import * as types from './mutation-types'
import {getLocalStore, setLocalStore, removeLocalStore} from 'common/global'
export default {
  //mutations里面功能需要单一，比较复杂时放在actions里面
  //购物车
  [types.ADD_COUNTER](state, payload) {
    state.cartList[payload.index].count += payload.addCount
  },
  [types.ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
    // state.cartList = [...state.cartList,payload]
  },
  [types.SUBTRACT_COUNTER](state, index) {
    state.cartList[index].count--
  },
  [types.DELETE_PRODUCT](state, index) {
    state.cartList.splice(index,1)
  },
  //用户基本信息
  [types.SAVE_USER_INFO](state, {
    userInfo
  }) {
    //把外界传来的userInfo保存到state中的userInfo
    state.userInfo = userInfo;
    //保存到本地缓存中
    setLocalStore('userInfo', state.userInfo)
  },

  //地址信息相关
  [types.INIT_USER_SHOPPING_ADDRESS](state) {
    let initUserShoppingAddress = getLocalStore('shoppingAddress')
    state.shoppingAddress = JSON.parse(initUserShoppingAddress) || []
  },

  [types.ADD_USER_SHOPPING_ADDRESS](state, payload) {
    state.shoppingAddress = [...state.shoppingAddress, payload]
    setLocalStore('shoppingAddress', state.shoppingAddress)
  },

  [types.DELETE_USER_SHOPPING_ADDRESS](state, id) {
    state.shoppingAddress = state.shoppingAddress.filter(item => item.id !== id)
    setLocalStore('shoppingAddress', state.shoppingAddress)
  },

  [types.CHANGE_USER_SHOPPING_ADDRESS](state, payload) {
    const index = state.shoppingAddress.findIndex(item => item.id === payload.id)
    state.shoppingAddress.splice(index, 1, payload)
    setLocalStore('shoppingAddress', state.shoppingAddress)
  },

  [types.UPDATE_CHOSEN_ADDRESS](state, payload) {
    state.chosenAddress = payload
  },
  //订单相关
  [types.ADD_UNPAY_ORDER](state,payload) {
    state.orderList.unPay = [...state.orderList.unPay, payload]
    setLocalStore('orderList', state.orderList)
  },
  [types.ADD_UNTRANSPORT_ORDER](state,payload) {
    state.orderList.unTransport = [...state.orderList.unTransport, payload]
    setLocalStore('orderList', state.orderList)
  },
  [types.ADD_UNGET_ORDER](state,payload) {
    state.orderList.unGet = [...state.orderList.unGet, payload]
    setLocalStore('orderList', state.orderList)
  },
  [types.ADD_UNCOMMENT_ORDER](state,payload) {
    state.orderList.unComment = [...state.orderList.unComment, payload]
    setLocalStore('orderList', state.orderList)
  },
  [types.UPDATE_ORDER_LIST](state,payload) {
    state.orderList = payload
    setLocalStore('orderList', state.orderList)
  }

}
