<template>
  <section class="cart">
    <h2 class="cart__title">Корзина</h2>
    <div class="cart__container">
      <div v-if="products.inCart.length > 0" class="cart__list">
        <transition-group name="list">
          <cart-item
            v-for="(item, index) in TotalProducts"
            :key="index"
            :id="item.id"
            :title="item.title"
            :cost="item.cost"
            :label="item.label"
            :image="item.image"
            :type="item.type"
            :disabled="item.disabled"
            @deleteFromCart="deleteFromCart"
          />
        </transition-group>
      </div>
      <div v-else class="cart__no-items-box">
        <h4 class="cart__no-items-title">В корзине нет товаров</h4>
        <div class="cart__no-items-text">Найдите то, что вам нужно в каталоге продуктов или вебинаров</div>
      </div>
      <div class="cart__price-counter-column">
        <cart-price :list="TotalProducts" />
      </div>
    </div>
    <!-- {{ TotalProducts }} -->
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useWebinarsStore } from '@/stores/webinars'
import { useMessage } from 'naive-ui'
import CartItem from '@/components/elements/CartItem.vue'
import CartPrice from '@/components/blocks/CartPrice.vue'

export default {
  components: {
    CartItem,
    CartPrice
  },
  setup () {
    const products = useProductsStore()
    const webinars = useWebinarsStore()
    const route = useRoute()
    const message = useMessage()
    const TotalProducts = ref([])

    onMounted(() => {
      products.inCart = checkCart()
      if (route.query['_payform_status'] === 'success') {
        localStorage.removeItem('inCart')
        products.inCart = []
        message.success('Оплата прошла успешно, вскоре приобретенные товары появятся в ваших курсах')
      }
      products.inCart.map(item => {
        if (item.type === 'course') {
          products.fetchOneProduct(item.id).then((result) => {
            if (result === true){
              let tempLabel = products.foundProduct.attributes.courseProgram.find(currentItem => currentItem.id === item.labelId)
              let tempCost = tempLabel.cost
              if (tempLabel.discount !== null) {
                tempCost = tempLabel.cost - (tempLabel.cost/100 * tempLabel.discount)
              }
              TotalProducts.value.push({
                'id': products.foundProduct.id,
                'type': 'course',
                'cardDescription': products.foundProduct.attributes.description,
                'title': products.foundProduct.attributes.title,
                'label': tempLabel.label,
                'image': products.foundProduct.attributes.image,
                'cost': tempCost,
              })
            } else {
              TotalProducts.value.push({
                'id': item.id,
                'type': item.type,
                'title': item.title,
                'label': item.label,
                'image': { 'data': null },
                'cost': item.cost,
                'disabled': true
              })
            }
          })
        } else if (item.type === 'webinar') {
          webinars.fetchOneWebinar(item.id).then((result) => {
            if (result === true){
              TotalProducts.value.push({
                'id': webinars.foundWebinar.id,
                'type': 'webinar',
                'title': webinars.foundWebinar.attributes.title,
                'label': 'Вебинар',
                'image': webinars.foundWebinar.attributes.image,
                'cost': webinars.foundWebinar.attributes.cost,
              })
            } else {
              TotalProducts.value.push({
                'id': item.id,
                'type': item.type,
                'title': item.title,
                'label': item.label,
                'image': { 'data': null },
                'cost': item.cost,
                'disabled': true
              })
            }
          })
        }
      })
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
    function deleteFromCart (id, type) {
      TotalProducts.value = TotalProducts.value.filter(item => filterItems(item, id, type))
      products.inCart = products.inCart.filter(item => filterItems(item, id, type))
      saveToCart(products.inCart)
    }
    function filterItems (item, id, type) {
      if (item.id === id && item.type === type) {
        return false
      } else {
        return true
      }
    }
    return {
      products,
      deleteFromCart,
      TotalProducts
    }
  }
}
</script>

<style lang="scss" scoped>
  .cart {
    width: 100%;
    min-height: 100vh;
    &__title {
      margin: 0;
      font-size: 40rem;
      line-height: 60rem;
      font-weight: 600;
      color: #644C5C;
    }
    &__container {
      display: flex;
      margin: 75rem 0 0 0;
      @media screen and (max-width: 1280px) {
        flex-direction: column;
        margin: 40px 0 0 0;
      }
    }
    &__list {
      margin: 0 30rem 0 0;
      width: calc(100% - 330rem);
      @media screen and (max-width: 1280px) {
        width: 100%;
      }
    }
    &__no-items-box {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__no-items-title {
      text-align: center;
      font-size: 18rem;
      color: #644C5C;
    }
    &__no-items-text {
      text-align: center;
      font-size: 14rem;
    }
  }
  .list-move, .list-enter-active, .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from, .list-leave-to {
    opacity: 0;
  }
  // .list-leave-active {
  //   position: absolute;
  // }
</style>