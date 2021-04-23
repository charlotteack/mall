<template>
  <div id="addAddress">
    <OrderNavBar class="my-address-nav" title="添加地址"></OrderNavBar>

    <van-address-edit :area-list="areaList"
                      show-postal
                      show-set-default
                      show-search-result
                      :search-result="searchResult"
                      @save="onSave"/>
  </div>
</template>

<script type="text/javascript">
  import OrderNavBar from "../childcomponents/OrderNavBar";
  // import { mapMutations, mapState } from 'vuex'
  import areaList from 'assets/js/area.js'
  export default {
    data () {
      return {
        areaList: areaList,
        searchResult: []
      }
    },
    components: {
      OrderNavBar
    },
    methods: {
      // ...mapMutations(['ADD_USER_SHOPPING_ADDRESS']),
      // 1.返回上级界面
      // 2. 保存
      onSave (content) {
        // let addressID = this.addressID().toString();
        // content['id'] = addressID;
        // content['address'] = content.province + content.city + content.county + content.addressDetail;
        // this.ADD_USER_SHOPPING_ADDRESS({
        //   addressID,
        //   content
        // });
        this.$router.back();
      },
      // 生成不重复的id
      addressID () {
        var lastUuid = 0;
        return (new Date()).getTime() * 1000 + (lastUuid++) % 1000;
      }
    }
  }
</script>
<style scoped>
  #addAddress {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 99999;
  }

  .van-address-edit__buttons .van-button {
    background: #f69;
  }

</style>
