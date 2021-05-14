<template>
  <div id="order">

    <OrderNavBar class="order-nav" title="填写订单"></OrderNavBar>

    <van-contact-card :type="address_type"
                      :name="this.chosenAddress.name"
                      :tel="this.chosenAddress.tel"
                      :add-text="address_text"
                      @click="chooseAddress"/>


    <OrderSimpleDisplay :orderGoods="orderGoods" @showGoodsList="showGoodsList"></OrderSimpleDisplay>


    <van-action-sheet v-model="isShowGoodsList" title="商品清单">
      <div class="content">
        <order-goods-list-item v-for="(item, index) in orderGoods" :item-info="item" :key="index"></order-goods-list-item>
      </div>
    </van-action-sheet>

    <OrderPayMethod></OrderPayMethod>

    <OrderCoupon @changeCouponMoney="changeCouponMoney" style="margin-top: 10px" :total-money="totalPrice" :transport-money="transportMoney"></OrderCoupon>

    <van-submit-bar :price="finalMoney" button-text="提交订单" @submit="onSubmit" button-color="#f69"/>

    <!-- 路由出口 -->
    <transition name="router-slider"
                mode="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>


  </div>
</template>

<script>
  import OrderNavBar from './childcomponents/OrderNavBar'
  import OrderSimpleDisplay from './childcomponents/OrderSimpleDisplay'
  import OrderGoodsListItem from './childcomponents/OrderGoodsListItem'
  import OrderPayMethod from './childcomponents/OrderPayMethod'
  import OrderCoupon from './childcomponents/OrderCoupon'
  import { Dialog } from 'vant'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import {formatDate} from "@/common/utils";
  import {addOrder} from 'network/order'

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
        totalPrice: 0,
        couponMoney: 0,
        isShowGoodsList: false
      }
    },
    computed: {
      ...mapState(['chosenAddress','orderList']),
      transportMoney() {
        return this.totalPrice >= 50 ? 0 : 3
      },
      finalMoney() {
        return (this.totalPrice + this.transportMoney - this.couponMoney)*100
      }
    },
    created() {
      this.orderGoods = this.$route.query.orderGoodsList
      this.totalPrice = Number(this.$route.query.totalPrice.replace('¥',''))

      if(Object.keys(this.chosenAddress).length !== 0) {
        this.address_type = 'edit'
        this.address_name = this.chosenAddress.name
        this.address_phone = this.chosenAddress.tel
      }

    },
    activated() {
      //从购物车过来执行了，从我的地址过来并没有执行，是因为子路由的关系还是因为router.back
      console.log(this.chosenAddress);

    },
    methods: {
      ...mapMutations(['add_unPay_order','add_unTransport_order']),
      ...mapActions(['deleteCart']),
      chooseAddress() {
        this.$router.push('/order/myAddress')
      },
      showGoodsList() {
        this.isShowGoodsList = true
      },
      changeCouponMoney(money) {
        this.couponMoney = money
      },
      onSubmit() {
        if(this.address_type === 'add') {
          Dialog.alert({
            title: '注意',
            message: '你还没有选择收货地址哦~',
          }).then(() => {
          });
        }else {
          //下单操作
          let order = {
            orderId: new Date().getTime(),
            buyerName: this.chosenAddress.name,
            buyerPhone: this.chosenAddress.tel,
            buyerAddress: this.chosenAddress.address,
            clothId: this.orderGoods.map(cloth => {
              return cloth.iid
            }),
            orderPrice: this.finalMoney/100,
            orderContent: this.orderGoods,
            createTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
          }
          Dialog.confirm({
            title: '注意',
            message: '请务必核对好订单信息，即将进入支付页面',
          })
            .then(() => {
              //订单已付款
              Dialog.alert({
                title: '注意',
                message: '支付成功，商家已经收到订单信息，祝您购物愉快~',
              }).then(() => {
                //添加待发货订单
                order.orderState = '待发货'
                this.add_unTransport_order(order)
                addOrder(order).then()
                //移除购物车
                order.clothId.forEach(iid => {
                  this.deleteCart(iid)
                })
                this.$router.back()
              });
            })
            .catch(() => {
              //订单未付款
              order.orderState = '待付款'
              this.add_unPay_order(order)
              addOrder(order).then()
              order.clothId.forEach(iid => {
                this.deleteCart(iid)
              })
              this.$router.back()
            });
        }
      }
    },
    watch:{
      $route( to , from ){
        // console.log( to , from )
        if(to.name === 'order' && from.name === 'myAddress') {
          this.address_type = 'edit'
          this.address_name = this.chosenAddress.name
          this.address_phone = this.chosenAddress.tel
        }
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
