<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <HomeSwiper :banner="banner"/>
    <HomeRecommendView :recommend="recommend"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from  './childComponents/HomeSwiper'
  import HomeRecommendView from './childComponents/HomeRecommendView'

  import {getHomeMultidata} from "network/home";


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView
    },
    data() {
      return {
        banner: [],
        recommend: []
      }
    },
    created() {
      getHomeMultidata().then(res => {
        console.log(res)
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
</style>
