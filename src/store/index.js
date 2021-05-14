import Vue from 'vue'
import Vuex from 'vuex'


import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  userInfo: {},
  cartList: [],
  shoppingAddress: [],
  chosenAddress: {},
  orderList: {
    unPay: [],
    unTransport: [],
    unGet: [],
    unComment: []
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  },
  getters
})
