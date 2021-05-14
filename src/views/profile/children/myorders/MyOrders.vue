<template>
  <div id="myOrder">
    <my-orders-nav-bar></my-orders-nav-bar>

    <content-tab :tabTitles="tabTitles" :firstIndex="Number(this.$route.params.title)-1" @tabChange="orderTabChange" class="myOrderTab">
      <!--<div v-if="ordersList.length !== 0">-->
      <div v-show="isEmpty">
        <van-empty description="还没有相应订单呢，快去逛逛叭~" />
      </div>

      <OrderSheet v-for="index of this.currentLength" :key="index" :buttonTexts="buttonTexts"
                  :currentOrderGoods="currentOrderGoods[index-1]" :orderId="orderIds[index-1]" @reload="reload"></OrderSheet>

      <!--</div>-->
    </content-tab>



  </div>
</template>

<script>
  import MyOrdersNavBar from './childcomponents/MyOrdersNavBar'
  import ContentTab from 'components/common/contenttab/ContentTab'
  import OrderSheet from './childcomponents/OrderSheet'
  import OrderListItem from './childcomponents/OrderListItem'
  import {getAllOrder} from 'network/order'
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: "MyOrders",
    components: {
      MyOrdersNavBar,
      ContentTab,
      OrderSheet,
      OrderListItem
    },
    data() {
      return {
        tabTitles: ['待付款','待发货','待收货','待评价'],
        currentTabTitle: '',
        currentLength: 0,
        currentOrderGoods: [[]],
        orderIds: [],
        buttonTexts: []
      }
    },
    computed: {
      ...mapState(['orderList','userInfo']),
      // currentLength: {
      //   get: function () {
      //
      //   },
      //   set: function () {
      //
      //   }
      // },
      // //二维数组，保存某一个状态的所有订单（每个订单是一个数组）
      // currentOrderGoods: {
      //   get: function () {
      //     if(this.currentLength !== 0){
      //       if(this.currentTabTitle === '待付款'){
      //         return this.orderList.unPay.map(item => {
      //           return item.orderContent
      //         })
      //       }else if(this.currentTabTitle === '待发货'){
      //         return this.orderList.unTransport[0].orderContent
      //       }else if(this.currentTabTitle === '待收货'){
      //         return this.orderList.unGet[0].orderContent
      //       }else{
      //         return this.orderList.unComment[0].orderContent
      //       }
      //     }else{
      //       return []
      //     }
      //   },
      //   set: function () {
      //
      //   }
      // },
      isEmpty: {
        get: function () {
          return this.currentLength === 0
        },
        set: function () {

        }
      },
    },
    // props: {
    //   firstTabTitle: {
    //     type: String,
    //     default() {
    //       return '待付款'
    //     }
    //   }
    // },
    created() {
      // console.log(this.firstTabTitle);
      let title = this.$route.params.title
      if(title === '1') {
        this.currentTabTitle = '待付款'
      }else if(title === '2'){
        this.currentTabTitle = '待发货'
      }else if(title === '3'){
        this.currentTabTitle = '待收货'
      }else {
        this.currentTabTitle = '待评价'
      }

      this.orderTabChange(this.currentTabTitle)
    },
    methods: {
      ...mapMutations(['update_order_list']),
      orderTabChange(title) {
        this.currentTabTitle = title
        // this.getCurrentAllOrders(this.userInfo.phoneNumber)
        getAllOrder(this.userInfo.phoneNumber).then(res => {
          // console.log(res.userOrderList);
          this.update_order_list(res.userOrderList)

          if(this.currentTabTitle === '待付款'){
            this.currentLength = this.orderList.unPay.length
            if(this.currentLength !== 0) {
              this.currentOrderGoods = this.orderList.unPay.map(item => {
                return item.orderContent
              })
              this.orderIds = this.orderList.unPay.map(item => {
                return item.orderId
              })
              this.buttonTexts = ['取消订单','继续付款']
            }else{this.currentOrderGoods = [[]];this.orderIds = [];}


          }else if(this.currentTabTitle === '待发货'){
            this.currentLength = this.orderList.unTransport.length

            if(this.currentLength !== 0) {
              this.currentOrderGoods = this.orderList.unTransport.map(item => {
                return item.orderContent
              })
              this.orderIds = this.orderList.unTransport.map(item => {
                return item.orderId
              })
              this.buttonTexts = ['申请开票','提醒发货']
            }else{this.currentOrderGoods = [[]];this.orderIds = []}

          }else if(this.currentTabTitle === '待收货'){
            this.currentLength = this.orderList.unGet.length

            if(this.currentLength !== 0) {
              this.currentOrderGoods = this.orderList.unGet.map(item => {
                return item.orderContent
              })
              this.orderIds = this.orderList.unGet.map(item => {
                return item.orderId
              })
              this.buttonTexts = ['查看物流','确认收货']
            }else{this.currentOrderGoods = [[]];this.orderIds = []}

          }else{
            this.currentLength = this.orderList.unComment.length
            if(this.currentLength !== 0) {
              this.currentOrderGoods = this.orderList.unComment.map(item => {
                return item.orderContent
              })
              this.orderIds = this.orderList.unComment.map(item => {
                return item.orderId
              })
              this.buttonTexts = ['去逛逛','去评价']
            }else{this.currentOrderGoods = [[]];this.orderIds = []}
          }
        })



      },
      reload(text) {
        if(text === '取消订单' || text === '继续付款') {
          this.orderTabChange('待付款')
        }else if(text === '确认收货') {
          this.orderTabChange('待收货')
        }
      }
    }

  }
</script>

<style scoped>
  #myOrder {
    position: relative;
    height: 100vh;
    z-index: 999;
    background-color: #f6f6f6;
  }
  >>>.van-tabs__wrap {
     overflow: hidden;
     position: relative;
  }
</style>
