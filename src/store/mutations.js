import * as types from './mutation-types'
export default {
  //mutations里面功能需要单一，比较复杂时放在actions里面
  [types.ADD_COUNTER](state, payload) {
    payload.count++
  },
  [types.ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  }
}
