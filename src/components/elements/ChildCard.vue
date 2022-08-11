<template>
  <ui-card class="child">
    <div class="child__title">Ребенок</div>
    <div class="child__name">{{ name }}</div>
    <div class="child__old">{{ old }}</div>
  </ui-card>
</template>

<script>
import UiCard from '../ui/UiCard.vue'
export default {
  components: {
    UiCard
  },
  props: {
    name: String,
    old: Number
  }
}
</script>

<style lang="scss" scoped>
  .child {
    &__title {
      color: #B79172;
      font-family: Montserrat;
      font-size: 14px;
      font-weight: 500;
      line-height: 19px;
    }
  }
</style>