<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isChecked:{
        type: Boolean,
        default: true,
      }
    }
  }
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    border: 1px solid #aaa;
  }
  .check{
    border-color: var(--color-background);
    background-color: var(--color-tint);
  }
</style>
