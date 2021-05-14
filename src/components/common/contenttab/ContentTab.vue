<template>
  <div>
    <van-tabs @click="onClick" v-model="currentIndex">
      <div v-for="title in tabTitles">
        <van-tab :title="title">
          <slot></slot>
        </van-tab>
      </div>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: "ContentTab",
    data() {
      return {
        currentIndex: this.firstIndex
      }
    },
    props: {
      tabTitles: {
        type: Array,
        required: true,
        default() {
          return []
        }
      },
      firstIndex: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    methods: {
      onClick(name, title) {
        this.$emit('tabChange', title)
      },
    },
  }
</script>

<style scoped>

</style>
