<template>
  <div class="product">
    <div
      v-if="webinars.GET_FOUNDWEBINAR.attributes"
      class="product__preview"
    >
      <img
        v-if="webinars.GET_FOUNDWEBINAR.attributes.image.data"
        class="product__image" :src="link + webinars.GET_FOUNDWEBINAR.attributes.image.data.attributes.url"
      />
      <div class="product__info-box">
        <h3 class="product__title" v-html="webinars.GET_FOUNDWEBINAR.attributes.title" />
        <div class="product__cost-container">
          <div class="product__cost-box">
            <div class="product__cost-numbers">
              <div
                v-if="webinars.GET_FOUNDWEBINAR.attributes.discount && webinars.GET_FOUNDWEBINAR.attributes.cost"
                class="product__cost"
                v-html=" Math.round((webinars.GET_FOUNDWEBINAR.attributes.cost)/100 * (100 - webinars.GET_FOUNDWEBINAR.attributes.discount))"
              />
              <div
                v-if="webinars.GET_FOUNDWEBINAR.attributes.cost"
                :class="{'product__cost': true, 'product__cost_with-discount': webinars.GET_FOUNDWEBINAR.attributes.discount}" 
                v-html="webinars.GET_FOUNDWEBINAR.attributes.cost + '&#8381;'"
              />
              <div 
                v-else
                class="product__discount"
                v-html="'Бесплатно'"
              />
            </div>
            <div
              v-if="webinars.GET_FOUNDWEBINAR.attributes.discount"
              class="product__discount"
              v-html="webinars.GET_FOUNDWEBINAR.attributes.discount + '%'"
            />
          </div>
          <square-button
            class="product__cart-button"
            :buttonPlaceholder="buttonPlaceholder"
            @click="addToCart()"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <div v-if="webinars.GET_FOUNDWEBINAR.attributes" class="product__description" v-html="webinars.GET_FOUNDWEBINAR.attributes.cardDescription" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useWebinarsStore } from '@/stores/webinars'
import { useProductsStore } from '@/stores/products'
import SquareButton from '@/components/ui/SquareButton.vue'
export default {
  components: {
    SquareButton
  },
  setup () {
    const webinars = useWebinarsStore()
    const products = useProductsStore()
    const route = useRoute()
    const buttonPlaceholder = ref('В корзину')
    const disabled = ref(false)
    const link = import.meta.env.VITE_UPLOADS_LINK
    webinars.fetchWebinars().then((result) => {
      if (result === true) {
        webinars.searchWebinar(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length)))
        if (!webinars.GET_FOUNDWEBINAR.attributes.cost) {
          buttonPlaceholder.value = 'Добавить'
        }
      }
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
    function addToCart () {
      if (webinars.GET_FOUNDWEBINAR.attributes.cost) {
        console.log('iwork')
        let tempCost
        let tempImage = webinars.GET_FOUNDWEBINAR.attributes.image.data.attributes.url
        if (webinars.GET_FOUNDWEBINAR.attributes.discount !== null) {
          tempCost =  Math.round((webinars.GET_FOUNDWEBINAR.attributes.cost)/100 * (100 - webinars.GET_FOUNDWEBINAR.attributes.discount))
        } else {
          tempCost = webinars.GET_FOUNDWEBINAR.attributes.cost
        }
        const tempData = {
          id: webinars.GET_FOUNDWEBINAR.id,
          type: 'webinar',
          cardDescription: webinars.GET_FOUNDWEBINAR.attributes.cardDescription,
          category: webinars.GET_FOUNDWEBINAR.attributes.category,
          title: webinars.GET_FOUNDWEBINAR.attributes.title,
          label: 'Вебинар',
          image: tempImage,
          cost: tempCost 
        }
        products.inCart.push(tempData)
        buttonPlaceholder.value = 'Уже добавлено в корзину'
        disabled.value = true
        saveToCart(products.inCart)
      }
    }
    onMounted(() => {
      products.inCart = checkCart()
      if (products.inCart.filter(item => item.type === 'webinar').find(item => item.id === Number(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length))))) {
        buttonPlaceholder.value = 'Уже добавлено в корзину'
        disabled.value = true
      }
    })
    return {
      webinars,
      products,
      buttonPlaceholder,
      disabled,
      addToCart,
      link
    }
  }
}
</script>

<style lang="scss" scoped>
  .product {
    width: 100%;
    max-height: 100vh;
    background-color: #FBFAF9;
    padding: 190px 75rem 140rem 110rem;
    height: 100vh;
    overflow-y: scroll;
    &__preview {
      display: flex;
    }
    &__image {
      width: calc(100% - 330rem);
      height: 360rem;
      object-fit: cover;
      border-radius: 15px;
    }
    &__info-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 300rem;
      margin: 0 0 0 30px;

    }
    &__title {
      font-weight: 600;
      font-size: 20rem;
      line-height: 30rem;
      color: #644C5C;
      margin: 0;
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__cost-box {
      margin: 0 0 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__cost-numbers {
      display: flex;
      align-items: center;
    }
    &__cart-button {
      width: 300rem;
      height: 50rem;
    }
    &__cost {
      font-weight: 600;
      font-size: 24px;
      line-height: 36px;
      color: #644C5C;
      &_with-discount {
        margin: 0 0 0 30px;
        color: #C4B0B1;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        text-decoration: line-through;
      }
    }
    &__discount {
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: #FFF;
      padding: 5px 15px;
      background-color: #644C5C;
      border-radius: 16px;
    }
    &__select:deep(.n-base-selection) {
      margin: 0 0 15px 0;
    }
    &__description {
      max-width: calc(100% - 330rem );
      margin: 40px 0 0 0;
      font-size: 14rem;
      word-break: break-word;
    }
  }
</style>