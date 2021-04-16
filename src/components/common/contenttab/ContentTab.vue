<template>
  <div>
    <van-tabs @click="onClick">
      <div v-for="title in tabTitles">
        <van-tab :title="title">
          <slot></slot>
        </van-tab>
      </div>
    </van-tabs>
  </div>
</template>

<script>
  import { Tab as VanTab, Tabs as VanTabs} from 'vant'
  export default {
    name: "ContentTab",
    components: {
      VanTab,
      VanTabs
    },
    props: {
      tabTitles: {
        type: Array,
        required: true,
        default() {
          return []
        }
      }
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
