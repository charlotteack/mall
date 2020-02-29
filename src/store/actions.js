import * as types from './mutation-types'
export default {
  //加入购物车，如果在购物车找得到，就把数量+1，找不到就把数量设置为1并添加到购物车
  addCart(context, payload) {
   return new Promise(resolve => {
     let product  = context.state.cartList.find(item => item.iid === payload.iid)
     if(product){
       context.commit(types.ADD_COUNTER, product)
       resolve('当前商品数量加1')
     } else {
       payload.count = 1
       payload.checked = true
       context.commit(types.ADD_TO_CART, payload)
       resolve('添加成功')
     }
   })
  }


}
