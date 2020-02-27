<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @navClick="navClick"></detail-nav-bar>

    <scroll class="detail-content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsDetail"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info :param-info="paramsInfo" ref="param"></detail-params-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>

  </div>
</template>

<script>
  import DetailNavBar from './childcomponents/DetailNavBar'
  import DetailSwiper from './childcomponents/DetailSwaper'
  import DetailBaseInfo from './childcomponents/DetailBaseInfo'
  import DetailShopInfo from './childcomponents/DetailShopInfo'
  import DetailGoodsInfo from './childcomponents/DetailGoodsInfo'
  import DetailParamsInfo from './childcomponents/DetailParamsInfo'
  import DetailCommentInfo from './childcomponents/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail,GoodsDetail,Shop,GoodsParam,getRecommend} from "network/detail";
  import {deBounce} from "../../common/utils";

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
        topicY: [0],
        getTopicY: null
      }
    },
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
        this.topicY.push(this.$refs.param.$el.offsetTop)
        this.topicY.push(this.$refs.comment.$el.offsetTop)
        this.topicY.push(this.$refs.recommend.$el.offsetTop)
      },100)

    },
    mounted() {
      let newRefresh = deBounce(this.$refs.scroll.refresh,100)
      this.$bus.$on('detailImageLoaded', () => {
        newRefresh()
        this.getTopicY()
      })
    },

    methods: {
      imageLoad() {
        this.$refs.scroll.refreshHeight()
      },
      navClick(index) {
        this.$refs.scroll.myScrollTo(0, -this.topicY[index], 500)
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
    height: calc(100% - 44px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
