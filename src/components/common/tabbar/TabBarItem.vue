<template>
  <div class="tab-bar-item" @click="changeActive">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activestyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path: {
        type: String
      },
      activeColor: {
        type: String,
        default: '#d81e06'
      }
    },

    computed: {
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1
      },
      activestyle(){
        return this.isActive?{color: this.activeColor}:{}
      }
    },
    methods:{
      changeActive(){
        this.$router.push(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    height: 49px;
    text-align: center;
    font-size: 12px;
  }
  .tab-bar-item img{
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;/*减小图片和文字默认3px的距离*/
  }
</style>
