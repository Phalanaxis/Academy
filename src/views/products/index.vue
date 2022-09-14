<template>
  <section class="products">
    <ui-title>Продукты</ui-title>
    <tagged-cards-list :list="products.GET_PRODUCTS" mainLink="/products/" />
  </section>
</template>

<script>
import { useProductsStore } from '@/stores/products'
import TaggedCardsList from '@/components/blocks/TaggedCardsList.vue'
import UiTitle from '@/components/ui/UiTitle.vue'
export default {
  components: {
    TaggedCardsList,
    UiTitle
  },
  provide: {
    isTagged: true,
  },
  setup () {
    const products = useProductsStore()
    products.fetchProducts()
    return {
      products
    }
  }
}
</script>

<style lang="scss" scoped>
  .products {
    width: 100%;
  }
</style>