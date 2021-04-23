<template>
  <div id="order">

    <OrderNavBar class="order-nav" title="填写订单"></OrderNavBar>

    <van-contact-card :type="address_type"
                      :name="address_name"
                      :tel="address_phone"
                      :add-text="address_text"
                      @click="chooseAddress"/>


    <OrderSimpleDisplay :orderGoods="orderGoods" @showGoodsList="showGoodsList"></OrderSimpleDisplay>


    <van-action-sheet v-model="isShowGoodsList" title="商品清单">
      <div class="content">
        <order-goods-list-item v-for="(item, index) in orderGoods" :item-info="item" :key="index"></order-goods-list-item>
      </div>
    </van-action-sheet>

    <OrderPayMethod></OrderPayMethod>

    <OrderCoupon style="margin-top: 10px"></OrderCoupon>

    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" button-color="#f69"/>

    <!-- 路由出口 -->
    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>


  </div>
</template>

<script>
  import OrderNavBar from './childcomponents/OrderNavBar'
  import OrderSimpleDisplay from './childcomponents/OrderSimpleDisplay'
  import OrderGoodsListItem from './childcomponents/OrderGoodsListItem'
  import OrderPayMethod from './childcomponents/OrderPayMethod'
  import OrderCoupon from './childcomponents/OrderCoupon'

  export default {
    name: "Order",
    components: {
      OrderNavBar,
      OrderSimpleDisplay,
      OrderPayMethod,
      OrderCoupon,
      OrderGoodsListItem
    },
    data() {
      return {
        address_type: 'add',
        address_name: '',
        address_phone: '',
        address_text: '请选择收货地址',
        orderGoods: [],
        isShowGoodsList: false
      }
    },
    created() {
      this.orderGoods = this.$route.query.orderGoodsList
      // console.log(this.orderGoods);
    },

    methods: {
      chooseAddress() {
        this.$router.push('/order/myAddress')
      },
      showGoodsList() {
        this.isShowGoodsList = true
      },
      onSubmit() {

      }
    }
  }
</script>

<style scoped>
  #order {
    width: 100%;
    height: 100vh;
    background-color: #f7f7f7;
  }
  /*转场动画*/
  .router-slider-enter-active,
  .router-slider-leave-active {
    transition: all 0.3s;
  }
  .router-slider-enter,
  .router-slider-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
