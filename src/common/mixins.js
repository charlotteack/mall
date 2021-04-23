import {deBounce} from "./utils.js"
import BackTop from 'components/content/backTop/BackTop.vue'
import {BACKTOP_DISTANCE} from './const.js'

export const goodItemListenerMixin = {
  data(){
    return {
      deBounceRefresh: null,
      itemImageListener: null,
    }
  },
mounted(){
  //将之前Home.vue和Detail.vue中在mounted代码中公共的代码抽离到这个混入对象的mounted方法中：
  this.deBounceRefresh = deBounce(this.$refs.myScroll.refreshHeight, 100);
  this.itemImageListener = ()=>{
    this.deBounceRefresh()
  }
  this.$bus.$on('itemImageLoad', this.itemImageListener)
}
}



export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    listenBackTop(position) {
      this.isShowBackTop = -(position.y) > BACKTOP_DISTANCE
    },
    backClick() {
      this.$refs.myScroll.myScrollTo(0, 0)
    }
  }
}

import {POP, NEW, SELL} from "./const.js";
export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
