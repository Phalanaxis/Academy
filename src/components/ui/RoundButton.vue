<template>
  <n-button
    class="round-button"
    round
    color="#78353E"
    @click="buttonEvent"
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
    }
  },
  methods: {
    buttonEvent () {
      this.$emit('buttonEvent')
    }
  }
}
</script>

<style>
  .round-button {
    --n-height: 42px!important;
    --n-font-size: 16px!important;
    letter-spacing: 0.03ch;
  }
</style>