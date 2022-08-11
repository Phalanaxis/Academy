<template>
  <div 
    class="container-slot"
    :style="'background-color:' + color"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#F5F3EF'
    }
  }
}
</script>

<style lang="scss" scoped>
  .container-slot {
    width: auto;
    height: auto;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
</style>