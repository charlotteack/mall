<template>
  <div>

    <van-cell-group>
      <van-cell title="商品金额" :value="totalMoney" />
      <van-cell title="配送费" :value="transportMoney"/>

      <!-- 优惠券单元格 -->
      <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />
      <!-- 优惠券列表 -->
      <van-popup
        v-model="showList"
        round
        position="bottom"
        style="height: 80%; padding-top: 4px;"
      >
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-popup>

    </van-cell-group>

    <!-- 备注 -->
    <van-cell-group style="margin-top: 0.6rem">
      <van-field label="备注"
                 type="textarea"
                 placeholder="选填，可以写入您的特殊需求"
                 rows="1"
                 autosize
                 is-link />
    </van-cell-group>
  </div>
</template>

<script>
  const coupon = {
    available: 1,
    condition: '无使用门槛\n最多优惠12元',
    reason: '时间已过',
    value: 150,
    name: '新用户大礼包',
    startAt: 1616490978,
    endAt: 1621761378,
    valueDesc: '1.5',
    unitDesc: '元',
  };
  const disabledCoupon = {
    available: 1,
    condition: '无使用门槛\n最多优惠12元',
    reason: '时间已过',
    value: 300,
    name: '新用户大礼包',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: '3.0',
    unitDesc: '元',
  };
  export default {
    name: "OrderCoupon",
    data() {
      return {
        chosenCoupon: -1,
        coupons: [coupon],
        disabledCoupons: [disabledCoupon],
        showList: false
      };
    },
    props: {
      totalMoney: {
        type: Number,
        default() {
          return 0
        }
      },
      transportMoney: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    methods: {
      onChange(index) {
        this.showList = false;
        this.chosenCoupon = index;
        if(this.coupons[this.chosenCoupon].valueDesc) {
          this.$emit('changeCouponMoney',Number(this.coupons[this.chosenCoupon].valueDesc))
        }
      },
      onExchange(code) {
        this.coupons.push(coupon);
      },
    },
  }
</script>

<style scoped>
  >>>.van-coupon-list__close{
    color: #fff;
    background-color: #f69;
    border: 1px solid #f69;
  }
</style>
