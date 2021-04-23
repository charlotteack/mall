<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">服装购</div></nav-bar>

    <tab-control :titles="['流行','新款','精选']" class="tab-control1" @tabclick="tabclick" ref="tabControl2" v-show="isTabFixed"></tab-control>

    <scroll class="scrollContent" ref="myScroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommend="recommend"/>
      <home-feature-view/>
      <tab-control :titles="['流行','新款','精选']"  @tabclick="tabclick" ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--注意组件不能直接监听点击事件，要加上native才能监听组件的原生事件。最后还是混入-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  import HomeSwiper from './childcomponents/HomeSwiper'
  import HomeRecommendView from './childcomponents/HomeRecommendView'
  import HomeFeatureView from './childcomponents/HomeFeatureView'

  import {getHomeMultidata,getHomeGoods} from "network/home";

  import {goodItemListenerMixin, backTopMixin} from "common/mixins";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,

    },
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    mixins: [goodItemListenerMixin, backTopMixin],
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //混入之后不需要了
      //图片加载完
      // const refresh = deBounce(this.$refs.scroll.refreshHeight,200)//进行防抖包装
      // this.$bus.$on('homeImageLoaded',() => {
      //   refresh()
      // })
    },
    activated() {
      this.$refs.myScroll.refreshHeight()
      this.$refs.myScroll.myScrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.myScroll.getY()
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    methods: {
      /**
       * 网络请求相关
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res)
          this.banner = res.data.banner.list
          this.recommend = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        let page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // console.log(res)
          this.goods[type].page += 1
          this.goods[type].list.push(...res.data.list)

          this.$refs.myScroll.finishPull()
        })
      },

      /**
       * 事件监听
       */
      tabclick(index) {
        switch (index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      contentScroll(position) {
        this.listenBackTop(position)
        this.isTabFixed = -position.y >= this.tabOffsetTop
      },

      loadMore() {
        this.getHomeGoods(this.currentType)
      },

      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop//不能直接获取组件的属性，需要使用el
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /*使用原生滚动需要定位*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .scrollContent {
    overflow: hidden;

    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }
  .tab-control1 {
    position: relative;
    z-index: 9;
  }
</style>
