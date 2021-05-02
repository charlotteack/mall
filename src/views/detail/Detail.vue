<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @navClick="navClick" ref="nav"></detail-nav-bar>

    <scroll class="detail-content" ref="myScroll" @scroll="scroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goodsDetail"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info :param-info="paramsInfo" ref="param"></detail-params-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>

    <van-sku
      ref="sku"
      v-model="isShowSku"
      :sku="sku"
      :goods="skuGoods"
      :goodsId="iid"
      :initial-sku="initialSku"
      @buy-clicked="okBtnClick"
    >
      <template #sku-actions="props">
      <div class="van-sku-actions">
        <button @click="props.skuEventBus.$emit('sku:buy')" class="okBtn">
          确定
        </button>
      </div>
    </template>


    </van-sku>


    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <detail-bottom-bar @addCart="addToCart" @quicklyBuy="quicklyBuy"/>
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

  import { Sku as VanSku } from 'vant';

  import {getDetail,GoodsDetail,Shop,GoodsParam,getRecommend} from "network/detail";
  import {deBounce} from "../../common/utils";
  import {regFenToYuan} from 'common/utils'
  import {goodItemListenerMixin, backTopMixin} from "common/mixins";

  import { mapActions , mapState} from 'vuex'

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
      Scroll,
      VanSku,
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
        currentIndex: 0,
        btnType: '',
        isShowSku: false,
        sku: {
          tree:[],
          list:[]
        },
        skuGoods: {
          picture: ''
        },
        initialSku:{}
      }
    },
    computed:{
      ...mapState(['userInfo']),
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
        this.$nextTick(() => {
          this.topicY = []
          this.topicY.push(0)
          this.topicY.push(this.$refs.param.$el.offsetTop)
          this.topicY.push(this.$refs.comment.$el.offsetTop)
          this.topicY.push(this.$refs.recommend.$el.offsetTop)
        })

        //初始化sku,json文件的数据格式和sku规定的有很大区别，操作起来比较费劲
        //先拿到整体的sku全部数据
        let mySkuData = data.skuInfo
        //拿图片
        let skuImgs = []
        mySkuData.skus.forEach(item => {
          if(skuImgs.indexOf(item.img) === -1) {
            skuImgs.push(item.img)
          }
        })
        //给sku的tree赋值，数据里面其实就两个规格，一个是颜色，一个是尺寸。props[0]是颜色对应tree[0]，props[1]尺寸对应tree[1]
        //至于id，后面传数据传的是id，但好像没有根据id拿name的方法，索性就把id的值也当成name
        let skuColorValues = []
        mySkuData.props[0].list.forEach((propsListItem,index) => {
          skuColorValues.push({
            id: propsListItem.name,
            name: propsListItem.name,
            imgUrl: skuImgs[index],
          })
        })
        this.sku.tree[0] = {
          k: mySkuData.props[0].label,
          k_s: 'styleId',
          v: skuColorValues
        }
        let skuSizeValues = []
        mySkuData.props[1].list.forEach((propsListItem) => {
          skuSizeValues.push({
            id: propsListItem.name,
            name: propsListItem.name,
          })
        })
        this.sku.tree[1] = {
          k: mySkuData.props[1].label,
          k_s: 'sizeId',
          v: skuSizeValues
        }
        //给sku的list添加数据，也就是全部的规格组合，唯一不确定的是id问题，我就用的0,1,2...;
        //其次官方文档里面没有说可以加图片路径，我发现可以自由补充，还比较方便
        mySkuData.skus.forEach((item, index) => {
          this.sku.list.push({
            id: index,
            imgUrl: item.img,
            styleId: item.style,
            sizeId: item.size,
            price: item.nowprice,
            stock_num: item.stock
          })
        })
        //开始不选的话，会出现总库存以及这个图片，或者利用参数initialSku来直接初始化也许，
        this.sku.stock_num = mySkuData.totalStock
        this.skuGoods.picture = skuImgs[0]
        this.initialSku = {
          selectedNum: 1,
          styleId: this.sku.list[0].styleId,
          sizeId: this.sku.list[0].sizeId
        }
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
        this.$refs.myScroll.myScrollTo(0, -this.topicY[index], 500)
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
        this.isShowSku = !this.isShowSku
        this.btnType = 'AddToCart'
      },

      okBtnClick(skuData) {
        // console.log(skuData)
        //在这里验证登录情况后再判断
        const  product = {}
        product.imgUrl = skuData.selectedSkuComb.imgUrl
        product.title = this.goodsDetail.title
        product.desc = `颜色款式：${skuData.selectedSkuComb.styleId}  尺码：${skuData.selectedSkuComb.sizeId}`
        product.price = regFenToYuan(skuData.selectedSkuComb.price)
        product.iid = this.iid
        product.count = skuData.selectedNum
        if(this.btnType === 'quicklyBuy') {
          //整理数据，因为进入订单有两种，一个是这里直接购买，还有一种是到购物里面结算
          //为方便起见，要保证传入订单的数据格式一样
          let orderGoodsList = []
          orderGoodsList.push(product)
          this.$router.push({
            path: '/order',
            query: {orderGoodsList}
          })
        }else {
          // this.$store.dispatch('addCart', product).then( res => {
          //   this.$toast.show(res, 2000)
          // })
          if ( Object.keys(this.userInfo).length !== 0) {
            this.addCart(product).then(res => {
              this.$toast.show(res, 2000)
            })
          }else{
            this.$router.push('/login')
          }

        }
      },
      quicklyBuy() {
        this.isShowSku = !this.isShowSku
        this.btnType = 'quicklyBuy'
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
  .okBtn {
    width: 100%;
    height: 49px;
    color: white;
    background-color: #f69;
    border: 0;
    padding: 0;
  }
</style>
