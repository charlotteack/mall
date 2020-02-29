<template>
  <div class="cart-list">
    <scroll class="cart-scroll" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :item-info="item" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  export default {
    name: "CartList",
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      Scroll,
      CartListItem
    },
    activated() {
      //每次进去应该刷新一次高度，避免加入商品后导致不能滚动的bug
      this.$refs.scroll.refreshHeight()
    }

  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px)
  }

  .cart-list .cart-scroll {
    height: 100%;
    overflow: hidden;
  }
</style>
