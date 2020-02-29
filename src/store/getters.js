export default {
  //所有商品列表
  cartList(state) {
    return state.cartList
  },
  //所有商品数量
  cartLength(state) {
    return state.cartList.reduce((prev, cur) => {
      return prev + cur.count
    }, 0)
  }
}
