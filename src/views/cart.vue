<template>
  <section class="cart">
    <h2 class="cart__title">Корзина</h2>
    <div class="cart__container">
      <div class="cart__list">
        <cart-item
          v-for="(item, index) in products.inCart"
          :key="index"
          :id="item.id"
          :title="item.title"
          :cost="item.cost"
          :label="item.label"
          :image="item.image"
          @deleteFromCart="deleteFromCart"
        />
      </div>
      <div class="cart__price-counter-column">
        <cart-price :list="products.inCart" />
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import CartItem from '@/components/elements/CartItem.vue'
import CartPrice from '@/components/blocks/CartPrice.vue'
export default {
  components: {
    CartItem,
    CartPrice
  },
  setup () {
    const products = useProductsStore()
    
    onMounted(() => {
      products.inCart = checkCart()
    })

    function checkCart () {
      if (localStorage.getItem('inCart')) {
        return JSON.parse(localStorage.getItem('inCart'))
      } else {
        return []
      }
    }

    function saveToCart () {
      const parsed = JSON.stringify(products.inCart)
      localStorage.setItem('inCart', parsed )
    }

    function deleteFromCart (id) {
      products.inCart = products.inCart.filter(item => item.id !== id)
      saveToCart(products.inCart)
    }
    return {
      products,
      deleteFromCart
    }
  }
}
</script>

<style lang="scss" scoped>
  .cart {
    width: 100%;
    min-height: 100vh;
    padding-top: 60px;
    background-color: #FBFAF9;
    &__title {
      margin: 0;
      font-size: 40rem;
      line-height: 60rem;
      font-weight: 600;
      color: #644C5C;
    }
    &__container {
      display: flex;
      margin: 75px 0 0 0;
    }
    &__list {
      margin: 0 30px 0 0;
      width: calc(100% - 330rem);
    }
  }
</style>