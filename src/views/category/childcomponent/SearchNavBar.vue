<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        shape="round"
        background="#ff8198"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
  </div>
</template>

<script>
  import { Search as VanSearch} from 'vant';
  export default {
    name: "SearchNavBar",
    components: {
      VanSearch,
    },
    data() {
      return {
        value: '',
      }
    },
    methods: {
      onSearch(val) {

      },
      onCancel() {

      },
    },
  }
</script>

<style scoped>
  /*搜索框的取消按钮文本颜色*/
  .van-search__action {
    color: white;
  }
</style>
