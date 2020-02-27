<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      //创建scroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //监听滚动
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll',position => {
          this.$emit('scroll',position)
        })
      }

      //监听上拉
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      myScrollTo(x, y, time=500) {
        this.scroll && this.scroll.scrollTo(x,y,time)
      },

      finishPull() {
        this.scroll.finishPullUp()
      },

      refreshHeight() {
        //注意可能没有挂载的时候，图片请求太快会调用，这个时候回报错
        this.scroll && this.scroll.refresh()
      },

      getY() {
        return this.scroll.y
      }
    }
  }
</script>

<style scoped>

</style>
