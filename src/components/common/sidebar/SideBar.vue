<template>
  <div>
    <van-sidebar v-model="activeKey" @change="onChange">
      <div v-for="title in sideBarTitles">
        <van-sidebar-item :title="title" />
      </div>
    </van-sidebar>
  </div>
</template>

<script>
  // 对vant侧边栏的一个再封装，需要父组件传入标题名数组，切换时会传出对应的标题名字
  export default {
    name: "SideBar",
    data() {
      return {
        activeKey: 0,
      }
    },
    props: {
      sideBarTitles: {
        type: Array,
        required: true,
        default() {
          return []
        }
      }
    },
    methods: {
      onChange(index) {
        this.$emit('sideBarChange', this.sideBarTitles[index])
      },
    },
  }
</script>

<style scoped>

</style>
