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
    <van-tabbar-item icon="bill-o" badge="5">待付款</van-tabbar-item>
    <van-tabbar-item icon="free-postage" badge="5">待发货</van-tabbar-item>
    <van-tabbar-item icon="logistics" badge="5">待收货</van-tabbar-item>
    <van-tabbar-item icon="comment-o" badge="20">待评价</van-tabbar-item>
  </van-tabbar>
</template>

<script>
  //开始考虑用宫格和徽标配合，但不方便。后来发现TabBar的位置可以通过fixed设置不固定在底部，使用起来很方便
  // import { Grid as VanGrid, GridItem as VanGridItem} from 'vant';
  // import { Badge as VanBadge} from 'vant';
  import { Tabbar as VanTabbar, TabbarItem as VanTabbarItem} from 'vant';
  export default {
    name: "UserGoodState",
    components: {
      // VanGrid,
      // VanGridItem,
      // VanBadge,
      VanTabbar,
      VanTabbarItem
    },
    data() {
      return {
        active: 0
      }
    },
    props: {

    }
  }
</script>

<style scoped>

</style>
