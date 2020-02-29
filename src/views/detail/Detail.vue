<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @navClick="navClick" ref="nav"></detail-nav-bar>

    <scroll class="detail-content" ref="scroll" @scroll="scroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsDetail"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info :param-info="paramsInfo" ref="param"></detail-params-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from './childcomponents/DetailNavBar'
  import DetailSwiper from './childcomponents/DetailSwiper'
  import DetailBaseInfo from './childcomponents/DetailBaseInfo'
  import DetailShopInfo from './childcomponents/DetailShopInfo'
  import DetailGoodsInfo from './childcomponents/DetailGoodsInfo'
  import DetailParamsInfo from './childcomponents/DetailParamsInfo'
  import DetailCommentInfo from './childcomponents/DetailCommentInfo'
  import DetailBottomBar from './childcomponents/DetailBottomBar'
  import GoodsList from 'components/content/goods/GoodsList'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail,GoodsDetail,Shop,GoodsParam,getRecommend} from "network/detail";
  import {deBounce} from "../../common/utils";
  import {goodItemListenerMixin, backTopMixin} from "common/mixins";

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsDetail: {},
        shop: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: [],
        topicY: [0, 0, 0, 0],
        getTopicY: null,
        currentIndex: 0

      }
    },
    mixins: [goodItemListenerMixin, backTopMixin],
    created() {
      this.iid = this.$route.params.iid
      //商品详细数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        let data = res.result
        //获取轮播图数据
        this.topImages = data.itemInfo.topImages
        //获取下面详细介绍
        this.goodsDetail = new GoodsDetail(data.itemInfo,data.columns,data.shopInfo.services)
        //商家信息
        this.shop = new Shop(data.shopInfo)
        //商品详细照片介绍
        this.detailInfo = data.detailInfo
        //商品参数
        this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        //全部渲染完之后确定每个主题的滚动位置,但是这样会因为图片加载缓慢而有错误
        // this.nextTick(() => {
        //   this.topicY = []
        //   this.topicY.push(0)
        //   this.topicY.push(this.$refs.param.$el.offsetTop)
        //   this.topicY.push(this.$refs.comment.$el.offsetTop)
        //   this.topicY.push(this.$refs.recommend.$el.offsetTop)
        // })
      })

      //推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      this.getTopicY = deBounce(() => {
        this.topicY = []
        this.topicY.push(0)
        this.topicY.push(this.$refs.param.$el.offsetTop - 10)
        this.topicY.push(this.$refs.comment.$el.offsetTop)
        this.topicY.push(this.$refs.recommend.$el.offsetTop)
        this.topicY.push(Number.MAX_VALUE)
      },100)
    },
    mounted() {
      //推荐图片的good-item刷新
      // let newRefresh = deBounce(this.$refs.scroll.refreshHeight,50)
      // this.$bus.$on('detailImageLoaded', () => {
      //   console.log('recommend')
      //   newRefresh()
      //   this.getTopicY()
      // })
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    methods: {
      ...mapActions(['addCart']),
      //商品图片的刷新
      imageLoad() {
        // console.log('info-swiper')
        this.deBounceRefresh()
        this.getTopicY()
      },
      //导航栏点击
      navClick(index) {
        this.$refs.scroll.myScrollTo(0, -this.topicY[index], 500)
      },
      //监听滚动
      scroll(position) {
        this.listenBackTop(position)
        const positionY = -position.y
        const length = this.topicY.length
        for (let i = 0; i < length - 1; i++) {
          //currentIndex可以方便判断,只修改一次.让数组后面多加一个很大的数可以使条件简单一点
          if (this.currentIndex !== i
            && (i < length-1 && positionY >= this.topicY[i] && positionY < this.topicY[i + 1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = i
          }
        }
      },

      addToCart() {
        const  product = {}
        product.image = this.topImages[0]
        product.title = this.goodsDetail.title
        product.desc = this.goodsDetail.desc
        product.price = this.goodsDetail.realPrice
        product.iid = this.iid
        // this.$store.dispatch('addCart', product).then( res => {
        //   this.$toast.show(res, 2000)
        // })

        // 利用vuex的映射
        this.addCart(product).then(res => {
          this.$toast.show(res, 2000)
        })
      }
    }
  }
</script>

<style scoped>
 #detail {
   position: relative;
   z-index: 11;
   background-color: white;
   height: 100vh;
 }
  .detail-content {
    height: calc(100% - 44px - 49px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
