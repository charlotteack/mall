<template>
  <div>
    <!-- 支付方式选择 -->
    <van-radio-group v-model="radio">
      <van-cell-group title="支付方式">
        <van-cell clickable @click="radio = '1'">
          <template slot="title">
            <img src="~assets/img/order/wx.png" alt="">
            <span>微信支付</span>
          </template>
          <van-radio slot="right-icon" name="1" checked-color="#f69" />
        </van-cell>
        <van-cell clickable
                  @click="radio = '2'">
          <template slot="title">
            <img src="~assets/img/order/zfb.png" alt="">
            <span>支付宝支付</span>
          </template>
          <van-radio slot="right-icon" name="2" checked-color="#f69" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
  export default {
    name: "OrderPayMethod",
    data() {
      return {
        radio: '1'
      }
    }
  }
</script>

<style scoped>
img {
  width: 30px;
  height: 25px;
  vertical-align: middle;
  padding-right:5px
}
.van-cell-group__title {
  padding: 4.267vw 2.267vw 2.133vw;
  color: #969799;
  font-size: 3.733vw;
  line-height: 4.267vw;
  background: white;
}
</style>
