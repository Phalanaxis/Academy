<template>
  <div class="simple__list">
    <card-item
      v-for="(item) in list"
      :key="item.id"
      :id="item.id"
      :title="item.attributes.title"
      :description="item.attributes.description"
      :image="item.attributes.image.data"
      :mainLink="this.mainLink"
      :cost="item.attributes.cost"
      :isCost="isCost"
    />
  </div>
</template>

<script>
import CardItem from '@/components/elements/CardItem.vue'
export default {
  components: {
    CardItem
  },
  props: {
    list: {
      type: Object,
      default: () => {}
    },
    mainLink: {
      type: String,
      default: '/'
    },
    isCost: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .simple {
    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 30rem;
      margin: 50rem 0 0 0;
      @media screen and (max-width: 1280px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 20rem;
      }
      @media screen and (max-width: 680px) {
        grid-template-columns: 1fr;
        grid-gap: 20rem;
      }
    }
  }
</style>