<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>

    <scroll class="detail-content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsDetail"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info :param-info="paramsInfo"></detail-params-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
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
        recommends: []
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
      })

      //推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

    },
    methods: {
      imageLoad() {
        this.refs.scroll.refresh()
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
