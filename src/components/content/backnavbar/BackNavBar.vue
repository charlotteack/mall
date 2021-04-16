<template>
    <nav-bar class="all-order-nav">
      <div slot="center">{{centerTitle}}</div>
      <van-icon name="arrow-left" slot="left" size="24" color="#fff" class="searchIcon" @click="backClick"/>
    </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { Icon as VanIcon} from 'vant';
export default {
   components: {
     NavBar,
     VanIcon
   },
   methods: {
     backClick() {
        this.$router.back()
      }
   },
   props: {
     centerTitle: {
       type: String,
       default: '标题',
       required: true
     }
   }
}
</script>

<style scoped>
  .all-order-nav {
    background-color: var(--color-tint);
    color: white;
  }
  .searchIcon{
    padding-top: 10px;
  }
</style>