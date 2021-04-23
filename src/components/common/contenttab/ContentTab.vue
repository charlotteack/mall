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
        currentIndex: 0
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
    },
    methods: {
      onClick(name, title) {
        this.$emit('categoryTabChange', title)
      },
    },
  }
</script>

<style scoped>

</style>
