<template>
  <!--<van-grid>-->
    <!--<van-badge :content="5" color="#ff8198">-->

    <!--</van-badge>-->
    <!--<van-grid-item icon="bill-o" text="待付款" />-->
    <!--<van-grid-item icon="free-postage" text="待发货" />-->
    <!--<van-grid-item icon="logistics" text="待收货" />-->
    <!--<van-grid-item icon="comment-o" text="待评价" />-->
  <!--</van-grid>-->
  <van-tabbar v-model="active" :fixed="false" active-color="#7d7e80">
    <van-tabbar-item icon="bill-o" :badge="this.orderList.unPay.length" to="/profile/order/1">待付款</van-tabbar-item>
    <van-tabbar-item icon="free-postage" :badge="this.orderList.unTransport.length" to="/profile/order/2">待发货</van-tabbar-item>
    <van-tabbar-item icon="logistics" :badge="this.orderList.unGet.length" to="/profile/order/3">待收货</van-tabbar-item>
    <van-tabbar-item icon="comment-o" :badge="this.orderList.unComment.length" to="/profile/order/4">待评价</van-tabbar-item>
  </van-tabbar>
</template>

<script>
  //开始考虑用宫格和徽标配合，但不方便。后来发现TabBar的位置可以通过fixed设置不固定在底部，使用起来很方便
  // import { Grid as VanGrid, GridItem as VanGridItem} from 'vant';
  // import { Badge as VanBadge} from 'vant';
  import { mapState} from 'vuex'
  export default {
    name: "UserGoodState",
    data() {
      return {
        active: 0
      }
    },
    props: {

    },
    computed: {
      ...mapState(['orderList']),
    },
  }
</script>

<style scoped>

</style>
