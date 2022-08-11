<template>
  <n-button
    class="square-button"
    color="#644C5C"
    :disabled="disabled"
  >
    {{ buttonPlaceholder }}
  </n-button>
</template>

<script>
export default {
  props: {
    buttonPlaceholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
  .square-button {
    --n-height: 42rem!important;
    --n-font-size: 16rem!important;
    --n-border-radius: 10px!important;
    letter-spacing: 0.03ch;
    width: 300rem!important;
  }
  .n-button.n-button--disabled {
    cursor: auto!important;
  }
</style>