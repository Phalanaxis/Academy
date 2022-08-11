<template>
  <div class="arrow-button">
    {{ text }}
    <small-arrow class="arrow-button__arrow" />
  </div>
</template>

<script>
import smallArrow from '@/assets/svg/smallArrow.vue'
export default {
  components: {
    smallArrow
  },
  props: {
    text: {
      type: String,
      default: 'Кнопка'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/core.scss';
  .arrow-button {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #644C5C;
    // font-size: 14px;
    font-size: 14rem;
    // @include adaptive-font(12, 22);
    line-height: 20rem;
    font-weight: 500;
    &:hover {
      .arrow-button__arrow {
        margin: 0 0 0 25px;
      }
    }
    &__arrow {
      margin: 0 0 0 15px;
      transition: margin .3s;
    }
  }
</style>