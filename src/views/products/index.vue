<template>
  <section class="products">
    <h2 class="products__title">Продукты</h2>
    <products-list :list="products.GET_PRODUCTS" />
  </section>
</template>

<script>
import { useProductsStore } from '@/stores/products'
import ProductsList from '@/components/blocks/ProductsList.vue'
export default {
  setup () {
    const products = useProductsStore()
    products.fetchProducts()
    return {
      products
    }
  },
  components: {
    ProductsList
  }
}
</script>

<style lang="scss" scoped>
  .products {
    width: 100%;
    min-height: 100vh;
    // padding-top: 60px;
    // padding-bottom: 50px;
    padding: 60rem 75rem 50rem 30rem;
    background-color: #FBFAF9;
    &__title {
      margin: 0;
      font-size: 40rem;
      line-height: 60rem;
      font-weight: 600;
      color: #644C5C;
    }
  }
</style>