<template>
  <div id="addAddress">
    <OrderNavBar class="my-address-nav" title="添加地址"></OrderNavBar>

    <van-address-edit :area-list="areaList"
                      show-postal
                      show-search-result
                      :search-result="searchResult"
                      @save="onSave"/>
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
        searchResult: []
      }
    },
    components: {
      OrderNavBar
    },
    computed: {
      ...mapState(['shoppingAddress'])
    },
    methods: {
      ...mapMutations(['add_user_shopping_address']),
      onSave (content) {
        content['id'] = this.shoppingAddress.length;
        content['address'] = content.province + content.city + content.county + content.addressDetail;
        this.add_user_shopping_address(content);
        this.$router.back();
      },
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

  >>>.van-button--danger {
    color: #fff;
    background-color: #f69;
    border: 1px solid #f69;
  }

</style>
