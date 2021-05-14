<template>
  <div id="order-sheet">

    <div class="orderId">
      <span>订单编号：{{orderId}}</span>
    </div>

    <van-divider :style="{ color: '#bbb', borderColor: '#f69',margin:'0'}"></van-divider>

    <OrderSimpleDisplay :orderGoods="currentOrderGoods" @showGoodsList="showGoodsList"></OrderSimpleDisplay>

    <!--<van-divider :style="{  margin:'0'}"></van-divider>-->

    <div class="operate">
      <van-button plain round size="small" @click="btn1Click">{{buttonTexts[0]}}</van-button>
      <van-button plain round type="info" size="small" style="margin-left: 10px" @click="btn2Click">{{buttonTexts[1]}}</van-button>
    </div>

    <van-action-sheet v-model="isShowGoodsList" title="商品清单">
      <div class="content">
        <order-list-item v-for="(item, index) in currentOrderGoods" :item-info="item" :key="index"></order-list-item>
      </div>
    </van-action-sheet>

  </div>
</template>

<script>
  import OrderSimpleDisplay from './OrderSimpleDisplay'
  import OrderListItem from './OrderListItem'
  import {deleteOrder,payOrder,receiveOrder} from 'network/order'
  import { Dialog } from 'vant'
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: "OrderList",
    components: {
      OrderSimpleDisplay,
      OrderListItem
    },
    data() {
      return {
        isShowGoodsList: false
      }
    },
    props: {
      currentOrderGoods: {
        type: Array,
        default() {
          return []
        }
      },
      orderId: {
        type: Number,
        default() {
          return 10086
        }
      },
      buttonTexts: {
        type: Array,
        default() {
          return ['取消','确认']
        }
      }
    },
    computed: {
      ...mapState(['orderList']),
    },
    methods: {
      ...mapMutations(['add_to_cart']),
      showGoodsList() {
        this.isShowGoodsList = true
      },
      btn1Click() {
        if(this.buttonTexts[0] === '取消订单') {
          Dialog.confirm({
            title: '注意',
            message: '确定要删除吗',
          })
            .then(() => {
              // console.log(this.currentOrderGoods);
              this.currentOrderGoods.forEach(item => {
                this.add_to_cart(item)
              })
              // let index = this.orderList.unPay.findIndex(item => {
              //   return item.orderId = this.orderId
              // })
              // this.orderList.unPay.splice(index,1)
              deleteOrder(this.orderId).then(res => {
                //这里需要进行一次数据重新
                this.$emit('reload','取消订单')
              })


            })
            .catch(() => {
            });

        }
      },
      btn2Click() {
        if(this.buttonTexts[1] === '继续付款') {
          // let index = this.orderList.unPay.findIndex(item => {
          //   return item.orderId = this.orderId
          // })
          // this.orderList.unTransport.push(this.orderList.unPay[index])
          // this.orderList.unPay.splice(index,1)
          payOrder(this.orderId).then(res => {
            //这里需要进行一次数据重新
            this.$emit('reload','继续付款')
          })
        }else if (this.buttonTexts[1] === '确认收货') {
          receiveOrder(this.orderId).then(res => {
            this.$emit('reload','确认收货')
          })
        }
      }
    }
  }
</script>

<style scoped>
  #order-sheet{
    background-color: white;
    margin: 3px 0;
    border-radius: 15px;
  }
  .orderId{
    padding: 1vw 2.267vw 0.5vw;
    color: #f69;
    font-size: 3.733vw;
    line-height: 4.267vw;
    text-align: center;
  }
  .operate{
    text-align: right;
  }
  .van-button--info {
    color: #ff6699;
    border: 1px solid #f69;
  }
</style>
