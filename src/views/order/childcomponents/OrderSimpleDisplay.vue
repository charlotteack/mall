<template>
  <div>
    <!-- 商品缩略图 -->
    <div class="title">
      <span>商品列表</span>
    </div>

    <div class="wrapper">
      <div class="productImageWrapper" ref="productImageWrapper">
        <ul class="imageWrapper" ref="imageWrapper">
          <li ref="subWrapper" style="display:inline"
              v-for="(item,index) in orderGoods"
              :key="index">
            <van-image
              fit="cover" height="5rem" width="5rem"
              :src="item.imgUrl"
            />
          </li>
        </ul>
      </div>
      <ul class="productCount" @click="showGoodsList">
        <span>共{{orderGoods.length}}种</span>
        <van-icon name="arrow" />
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "OrderSimpleDisplay",
    components:{
      BScroll
    },
    props: {
      orderGoods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    mounted() {
      // 有商品才加载可滑动组件
      if (this.orderGoods.length > 0) {
        this.$nextTick(() => {
          this.initScroll();
        })
      }
    },
    methods: {
      initScroll () {
        if (!this.productImageScroll) {
          this.$refs.imageWrapper.style.width = (this.$refs.subWrapper.length * 60) + 'px';
          this.productImageScroll = new BScroll(this.$refs.productImageWrapper, {
            probeType: 3,
            startX: 0,
            click: true,
            scrollX: true,
          });
        } else {
          this.productImageScroll.refresh();
        }
      },
      showGoodsList() {
        this.$emit('showGoodsList')
      }
    },

  }
</script>

<style scoped>
  .title{
    background-color: white;
    padding: 4.267vw 2.267vw 2.133vw;
    color: #969799;
    font-size: 3.733vw;
    line-height: 4.267vw;
  }
  .wrapper {
    height: 6rem;
    width: 100%;
    position: relative;
    background: white;
  }
  .productImageWrapper {
      display: flex;
      white-space: nowrap;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: start;
      height: 6rem;
      width: 80%;
      overflow: hidden;
  }
  .imageWrapper {
    flex-wrap: nowrap;
  }

  .productCount {
    right: 0.1rem;
    top: 1.5rem;
    position: absolute;
    color: grey;
  }
</style>
