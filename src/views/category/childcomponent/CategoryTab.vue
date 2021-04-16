<template>
  <div>
    <content-tab :tabTitles="tabTitles" @categoryTabChange="tabChange" animated>
      <van-grid :column-num="3">
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </content-tab>
  </div>
</template>

<script>
  import ContentTab from 'components/common/contenttab/ContentTab'
  import { Grid as VanGrid, GridItem as VanGridItem} from 'vant';
  export default {
    name: "CategoryTab",
    components: {
      ContentTab,
      VanGrid,
      VanGridItem
    },
    data() {
      return {
        tabTitles: ['tab','tab','tab','tab','tab','tab','tab','tab','tab','tab']
      }
    },
    methods: {
      tabChange(title) {
        console.log(title)
      }
    }
  }
</script>

<style scoped>

</style>
