<template>
  <div class="webinars__list">
    <webinar-item
      v-for="(item) in list"
      :key="item.id"
      :id="item.id"
      :title="item.attributes.title"
      :description="item.attributes.cardDescription"
      :image="item.attributes.image.data"
    />
  </div>
</template>

<script>
import WebinarItem from '@/components/elements/WebinarItem.vue'
export default {
  data () {
    return {
      currentTag: '',
      colorPallete: ['#644C5C', '#78353E', '#829288', '#C89C7A']
    }
  },
  components: {
    WebinarItem
  },
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .webinars {
    &__list {
      margin: 40px 0 0 0;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 30rem;
    }
  }
</style>