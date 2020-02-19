<template>
  <div>
    <TabBar>
      <TabBarItem path="/home">
        <img src="~assets/img/tabbar/home.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem path="/list">
        <img src="~assets/img/tabbar/list.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/list_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">分类</div>
      </TabBarItem >
      <TabBarItem path="/cart">
        <img src="~assets/img/tabbar/cart.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/cart_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem path="/profile">
        <img src="~assets/img/tabbar/user.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/user_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">我的</div>
      </TabBarItem>
    </TabBar>
  </div>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'
  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
