<template>

  <div>
    <search-nav-bar></search-nav-bar>

    <div class="categoryContent">

      <div class="categoryside">
        <side-bar :sideBarTitles="sideBarTitles" @sideBarChange="changeCategory"></side-bar>
      </div>

      <div class="categorytab">
        <category-tab></category-tab>
      </div>
    </div>

  </div>

</template>

<script>
  import SearchNavBar from './childcomponent/SearchNavBar'
  import SideBar from 'components/common/sidebar/SideBar'
  import CategoryTab from './childcomponent/CategoryTab'
  export default {
    name: "Category",
    components: {
      SearchNavBar,
      SideBar,
      CategoryTab
    },
    data() {
      return {
        sideBarTitles: ['女装', '男装', '童装','女装', '男装', '童装']
      }
    },
    methods: {
      changeCategory(title) {
        console.log(title)
      }
    }
  }
</script>

<style scoped>
  .categoryContent {
    /*display: flex;*/
  }
  .categoryside {
    width: 80px;
  }
  .categorytab{
    /*position: absolute;*/
    position: fixed;
    top: 54px;
    left: 80px;
    width: calc(100% - 80px);
  }
</style>
