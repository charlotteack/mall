<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        isShow: false,
        message: ''
      }
    },
    methods: {
      show(message = '默认文字', delay = 1500) {
        this.message = message
        this.isShow = true

        setTimeout(() => {
          this.isShow = false
          this.message = ''
        },delay)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    z-index: 9999;
    top: 50%;
    left: 50%;
    transform: translate(-50%);

    padding: 8px 10px;
    border-radius: 5%;
    background: rgba(0,0,0,.6);
    color: #fff;

  }
</style>
