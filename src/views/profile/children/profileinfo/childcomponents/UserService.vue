<template>
  <div id="userService">
    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link to="/profile/order/1"/>
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="points" title="我的积分" is-link />
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="gift-o" title="我收到的礼物" is-link />
      <van-cell icon="comment-circle-o" title="反馈" is-link />
    </van-cell-group>
  </div>
</template>

<script>
  export default {
    name: "UserService",
  }
</script>

<style scoped>
  #userService{
    background: #eee;
    padding-top: 15px;
  }
  .user-group {
      margin-bottom: 15px;
  }
</style>
