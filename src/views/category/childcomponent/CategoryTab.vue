<template>
  <div>
    <content-tab :tabTitles="tabTitles" @tabChange="categoryTabChange">
      <!--<van-grid :column-num="2">-->
        <!--<van-grid-item v-for="(good, index) in goodsList" :text="good.clothName" :key="index">-->
          <!--<van-image :src="good.imgURL" height="50" width="50"/>-->
        <!--</van-grid-item>-->
      <!--</van-grid>-->

      <!--还是使用和首页一样，不用宫格-->
      <div v-if="goodsList.length !== 0" class="categoty-goods-container">
        <goods-list :goods="goodsList" id="category-goods"></goods-list>
      </div>
    </content-tab>

  </div>
</template>

<script>
  import ContentTab from 'components/common/contenttab/ContentTab'
  import GoodsList from 'components/content/goods/GoodsList'
  // import { Grid as VanGrid, GridItem as VanGridItem} from 'vant';
  // import { Image as VanImage } from 'vant'
  export default {
    name: "CategoryTab",
    components: {
      ContentTab,
      GoodsList,
    },
    data() {
      return {

      }
    },
    props: {
      tabTitles: {
        type: Array,
        default() {
          return []
        }
      },
      goodsList: {
        type: Array,
        default() {
          return []
        }
      },
      // refName: {
      //   type: String,
      //   default() {
      //     return ''
      //   }
      // }
    },
    methods: {
      categoryTabChange(title) {
        this.$emit('changeCategoryTab',title)
      },

    },

    // mounted() {
    //   console.log(this.$refs.myScroll)
    // },

  }
</script>

<style>
  /*这里样式没加scope可能会污染，所以用的id，但还是注意下*/
  #category-goods img{
    height: 215px!important;
  }
  .categoty-goods-container{
    position: absolute;
    top: 44px;

  }
  .van-tabs__wrap {
    overflow: hidden;
    position: fixed;
    z-index: 10;
  }
</style>
