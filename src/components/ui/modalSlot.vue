<template>
  <div class="modal-form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    paddings: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-form {
    width: auto;
    height: auto;
    background-color: #F4EBE4;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 40px 110px;
    @media screen and (max-width: 680px) {
      padding: 60px 20px;
    }
    @media screen and (max-width: 470px) {
      border-radius: 0;
    }
  }
</style>