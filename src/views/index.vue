<template>
  <section class="index">
    <h4 class="index__title">Рассчитать срок беременности</h4>
    <calculator />
    <h4 class="index__title">Предположительный срок беременности</h4>
  </section>
</template>

<script>
  import Calculator from '../components/blocks/Calculator.vue'
  export default {
    components: {
      Calculator
    },
    setap() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .index {
    padding: 148px 75px 0 30px;
    &__title {
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    color: #644C5C;
  }
  }
</style>
