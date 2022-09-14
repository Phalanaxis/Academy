<template>
  <section class="index">
    <test />
    <h4 class="index__title">Специальные предложения</h4>
    <actions />
  </section>
</template>

<script>
  import Test from '@/components/blocks/Test.vue'
  import Actions from '@/components/blocks/Actions.vue'
  export default {
    components: {
      Test,
      Actions
    },
  }
</script>

<style lang="scss" scoped>
  .index {
    @media screen and (min-width: 1281px) {
      padding-top: 145rem;
    }
    
    &__title {
      font-family: Montserrat;
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
      color: #644C5C;
    }
  }
</style>
