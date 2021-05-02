<template>
  <div id="editAddress">
    <OrderNavBar class="my-address-nav" title="修改地址"></OrderNavBar>

    <van-address-edit :area-list="areaList"
                      show-postal
                      show-delete
                      show-set-default
                      show-search-result
                      :addressInfo="addressInfo"
                      :search-result="searchResult"
                      @save="onSave"
                      @delete="onDelete"/>
  </div>
</template>

<script type="text/javascript">
  import OrderNavBar from "../childcomponents/OrderNavBar";
  import { mapMutations, mapState } from 'vuex'
  import areaList from 'assets/js/area.js'

  export default {
    data () {
      return {
        areaList: areaList,
        addressInfo: {},
        searchResult: []
      }
    },
    mounted () {
      // 处理路由传过来的数据
      this.addressInfo = this.$route.params.content;
    },
    components: {
      OrderNavBar
    },
    methods: {
      ...mapMutations([ 'delete_user_shopping_address', 'change_user_shopping_address']),
      onSave (content) {
        content['address'] = content.province + content.city + content.county + content.addressDetail;
        this.change_user_shopping_address(content);
        this.$router.back();
      },
      onDelete (content) {
        this.delete_user_shopping_address(content.id);
        this.$router.back();
      }
    }
  }
</script>
<style scoped>
  #editAddress {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 999;
  }
</style>
