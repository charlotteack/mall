<template>
  <div class="cart">
    <nav-bar class="nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>

  </div>

</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childcomponent/CartList'
  import CartBottomBar from './childcomponent/CartBottomBar'

  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    data() {
      return {

      }
    },
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
