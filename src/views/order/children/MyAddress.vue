<template>
  <div id="myAddress">
    <OrderNavBar class="my-address-nav" title="我的地址"></OrderNavBar>

    <div v-show="isEmpty">
      <van-empty description="还没有地址呢，添加一个叭~" />
    </div>

    <van-address-list v-model="chosenAddressId"
                      :list="shoppingAddress"
                      @add="onAdd"
                      @edit="onEdit"
                      @select="onBackAddress">
    </van-address-list>
    <!-- 路由出口 -->
    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script type="text/javascript">
  import OrderNavBar from "../childcomponents/OrderNavBar";
  import { mapState, mapMutations } from 'vuex'
  // import { getLocalStore } from './../../../config/global.js'
  // 引入发布订阅
  // import { CHOOSE_USER_ADDRESS } from './../../../config/pubsub_type.js'
  // import PubSub from 'pubsub-js'

  export default {
    data () {
      return {
        chosenAddressId: null,
        addressList: [],
      }
    },
    computed: {
      ...mapState(['shoppingAddress','chosenAddress']),
      isEmpty: {
        get: function () {
          return this.shoppingAddress.length===0
        },
        set: function () {

        }
      },
    },
    mounted () {
      this.init_user_shopping_address();
    },
    components: {
      OrderNavBar
    },
    // activated() {
    //   console.log('hhh');
    //   if(Object.keys(this.chosenAddress).length !== 0) {
    //     this.chosenAddressId = this.chosenAddress.id
    //   }
    // },
    methods: {
      ...mapMutations(['init_user_shopping_address','update_chosen_address']),
      backClick () {
        this.$router.back();
      },
      onAdd () {
        this.$router.push({ path: '/order/myAddress/addAddress' });
      },
      onEdit (item, index) {
        this.$router.push({ name: 'editAddress', params: { content: item } });
      },
      onBackAddress (item, index) {
        this.update_chosen_address(item)
        this.chosenAddressId = this.chosenAddress.id
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  #myAddress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
    z-index: 666;
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

  .van-address-item .van-radio__icon--checked .van-icon {
    background-color: #f69;
    border-color: #f69;
  }
  .van-address-list__add {
    background: #f69;
    border: #f69;
  }

</style>
