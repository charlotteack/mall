<template>

  <div id="category">
    <search-nav-bar class="category_search"></search-nav-bar>

    <div class="categoryside">
      <side-bar :sideBarTitles="sideBarTitles" @sideBarChange="changeCategorySide"></side-bar>
    </div>

    <!--制造吸顶效果-->
    <!--<div class="categorytab2" v-show="isShowTab2">-->
      <!--<category-tab :tabTitles="tabTitles" :ref-name="refNames[1]" ref="categoryTab2"-->
                    <!--@changeCategoryTab="changeCategoryTab">-->
      <!--</category-tab>-->
    <!--</div>-->

    <!--<scroll class="scrollContent" ref="myScroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true">-->
      <category-tab class="categorytab" :tabTitles="tabTitles" :goodsList="goodsList" ref="categoryTab"
                    @changeCategoryTab="changeCategoryTab">
      </category-tab>



    <!--</Scroll>-->

    <!--<back-top @click.native="backClick" v-show="isShowBackTop"/>-->
  </div>

</template>

<script>
  import SearchNavBar from './childcomponent/SearchNavBar'
  import SideBar from 'components/common/sidebar/SideBar'
  // import Scroll from 'components/common/scroll/Scroll'
  import CategoryTab from './childcomponent/CategoryTab'

  // import {goodItemListenerMixin,backTopMixin} from "common/mixins";

  import {getCategoryGoods, getCategoryTitles} from "network/category";

  export default {
    name: "Category",
    components: {
      SearchNavBar,
      SideBar,
      // Scroll,
      CategoryTab
    },
    data() {
      return {
        sideBarTitles: ['女装', '男装', '童装'],
        tabTitles: ['T恤','衣衫','卫衣','裙装','裤装','外套','套装','背心'],
        allTabTitles: [[]],
        currentSideBarTitle: '',
        currentTabTitle: '',
        // refNames:['tab1', 'tab2'],
        goodsList: [],
        // isShowTab2: false,
        saveY: 0
      }
    },
    // mixins: [goodItemListenerMixin,backTopMixin],
    created() {
      this.getCategoryTitles()
      this.currentSideBarTitle = this.sideBarTitles[0]
      this.currentTabTitle = this.tabTitles[0]

      this.getCategoryGoods(this.currentSideBarTitle, this.currentTabTitle)
    },
    activated() {
      // this.$refs.myScroll.refreshHeight()
      // this.$refs.myScroll.myScrollTo(0, this.saveY, 0)
    },
    deactivated() {
      // this.saveY = this.$refs.myScroll.getY()
      // this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    methods: {
      //网络请求
      getCategoryTitles() {
        getCategoryTitles().then(res => {
          this.sideBarTitles = res.sideBarTitles
          this.allTabTitles = res.tabTitles
          this.tabTitles = this.allTabTitles[0]
          // console.log(res.sideBarTitles,res.tabTitles)
        })
      },

      getCategoryGoods(bigType, smallType) {
        getCategoryGoods(bigType, smallType).then(res => {
          this.goodsList = res
        })
      },
      //改变衣服大类型
      changeCategorySide(title) {
        // console.log(title)
        // 修改侧边栏标题对应的分类，修改大类的时候，小类也要跟着一起变
         let index = this.sideBarTitles.findIndex((item) => {
         return item === title
       })
        this.tabTitles = this.allTabTitles[index]
        this.currentSideBarTitle = title
        this.currentTabTitle = this.tabTitles[0]

        this.getCategoryGoods(this.currentSideBarTitle, this.currentTabTitle)
      },
      //修改衣服穿着小类
      changeCategoryTab(title) {
        this.currentTabTitle = title
        // this.activeTabIndex = this.tabTitles.findIndex((item) => {
        //   return item === title
        // })
        //开始想着利用better-scroll做一个和首页一样的，后来引入的vant-tab由于再封装了几次，操作起来很复杂，就像下面
        // 这样refs嵌套使用。但是出了一个问题van-tabs里面v-model绑定的值变了但是选中的样式有问题，总感觉两个tab一起用会出现干扰
        //最后还是使用原生的滚动，其实也还行。
        // this.$refs.categoryTab.$refs.tab1.currentIndex = index
        // this.$refs.categoryTab2.$refs.tab2.currentIndex = index

        this.getCategoryGoods(this.currentSideBarTitle, this.currentTabTitle)
        // this.$refs.myScroll.myScrollTo(0, 0)
      },
      //监听滚动
      // contentScroll(position) {
      //   this.listenBackTop(position)
      //   this.isShowTab2 = position.y < 0
      // }
    }
  }
</script>

<style scoped>

  #category {
    position: relative;
    height: 100vh;
  }
  /*.scrollContent {*/
    /*overflow: hidden;*/
    /*position: absolute;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 54px;*/
    /*bottom: 49px;*/
  /*}*/
  .categoryside {
    position: relative;
    width: 80px;
    overflow: auto;
    height: calc(100% - 54px - 49px);
    z-index: 9;
  }
  .categoryside::-webkit-scrollbar{
    /*隐藏滚动条*/
    display:none;
  }
  .categorytab::-webkit-scrollbar{
    /*隐藏滚动条*/
    display:none;
  }
  .categorytab{
    position: absolute;
    top: 54px;
    left: 80px;
    width: calc(100% - 80px);
    height: calc(100% - 54px - 49px);
    overflow: auto;
  }

  /*.categorytab2{*/
    /*position: fixed;*/
    /*left: 80px;*/
    /*top: 54px;*/
    /*width: calc(100% - 80px);*/
    /*z-index: 9;*/
  /*}*/

</style>
