<template>
  <div>
    <nav-bar class="order-bar">
      <div slot="left" class="left-icon" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">.
      </div>

      <div slot="center" class="title">
        <span>{{title}}</span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "OrderNavBar",
    components: {
      NavBar
    },
    props: {
      title: {
        type: String,
        default() {
          return ''
        }
      }
    },
    methods: {
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .order-bar {
    background-color: white;
  }
  .left-icon img {
    margin-top: 10px;
  }
</style>
