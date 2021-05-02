import * as types from './mutation-types'
export default {
  //加入购物车，如果在购物车找得到，就把数量+1，找不到就把数量设置为1并添加到购物车
  addCart(context, payload) {
   return new Promise(resolve => {
     let index  = context.state.cartList.findIndex(item => item.iid === payload.iid)
     if(index!==-1){
       let addCount = payload.count
       context.commit(types.ADD_COUNTER, {index: index,addCount: addCount})
       resolve('当前商品数量加' + addCount)
     } else {
       payload.checked = true
       context.commit(types.ADD_TO_CART, payload)
       resolve('添加成功')
     }
   })
  },

  subtractCart(context, payload) {
    return new Promise(resolve => {
      let index = context.state.cartList.findIndex(item => {
        return item.iid = payload
      })
      context.commit(types.SUBTRACT_COUNTER, index)
      resolve('当前商品数量减1')
    })
  },

  deleteCart(context, payload) {
    return new Promise(resolve => {
      let index = context.state.cartList.findIndex(item => {
        return item.iid = payload
      })
      context.commit(types.DELETE_PRODUCT, index)
      resolve('成功删除')
    })
  },



  // 1.同步用户信息
  saveUserInfo(context, userInfo) {
    context.commit(types.SAVE_USER_INFO, {
      userInfo
    });
  },


}
