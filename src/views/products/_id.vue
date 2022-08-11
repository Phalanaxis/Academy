<template>
  <div class="product">
    <div v-if="products.GET_FOUNDPRODUCT.attributes" class="product__preview">
      <img v-if="products.GET_FOUNDPRODUCT.attributes.image.data !== null" class="product__image" :src="link + products.GET_FOUNDPRODUCT.attributes.image.data.attributes.url" />
      <div class="product__info-box">
        <h3 class="product__title">{{ products.GET_FOUNDPRODUCT.attributes.title }}</h3>
        <div class="product__cost-container">
          <div  v-if="selectCourseValue" class="product__cost-box">
            <div class="product__cost-numbers">
              <div class="product__cost" v-if="selectCourseValue.discount !== null" v-html=" Math.round((selectCourseValue.cost)/100 * (100 - selectCourseValue.discount))" />
              <div :class="{'product__cost': true, 'product__cost_with-discount': selectCourseValue.discount !== null}" v-html="selectCourseValue.cost + '&#8381;'" />
            </div>
            <div v-if="selectCourseValue.discount !== null" class="product__discount" v-html="selectCourseValue.discount + '%'" />
          </div>
          <n-select
            v-if="products.GET_FOUNDPRODUCT.attributes.courseProgram.length"
            class="product__select"
            :default-value="products.GET_FOUNDPRODUCT.attributes.courseProgram[0].label"
            v-model:value="selectCourseValue.value"
            :options="courseOptions"
            :on-update:value="setProgram"
          />
          <n-select
            v-else
            class="product__select"
            default-value="Полный курс"
            disabled
          />
          <square-button
            class="product__cart-button"
            :buttonPlaceholder="buttonPlaceholder"
            @click="addToCart(selectCourseValue)"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <div v-if="products.GET_FOUNDPRODUCT.attributes" class="product__description">
      {{ products.GET_FOUNDPRODUCT.attributes.cardDescription }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import SquareButton from '@/components/ui/SquareButton.vue'
export default {
  components: {
    SquareButton
  },
  setup () {
    const products = useProductsStore()
    const route = useRoute()
    const buttonPlaceholder = ref('В корзину')
    const disabled = ref(false)
    const courseOptions = ref([])
    const selectCourseValue = ref('')
    const link = import.meta.env.VITE_UPLOADS_LINK
    products.fetchProducts().then((result) => {
      if (result === true) {
        products.searchProduct(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length)))
      }
    }).then(() => {
      selectCourseValue.value = products.GET_FOUNDPRODUCT.attributes.courseProgram[0]
      products.GET_FOUNDPRODUCT.attributes.courseProgram.forEach(item => {
        courseOptions.value.push({
          id: item.id,
          label: item.label,
          value: item.label,
          cost: item.cost,
          discount: item.discount
        })
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
    function addToCart () {
      let tempCost
      let tempImage = products.GET_FOUNDPRODUCT.attributes.image.data.attributes.url
      if (selectCourseValue.value.discount !== null) {
        tempCost =  Math.round((selectCourseValue.value.cost)/100 * (100 - selectCourseValue.value.discount))
      } else {
        tempCost = selectCourseValue.value.cost
      }
      const tempData = {
        id: products.GET_FOUNDPRODUCT.id,
        cardDescription: products.GET_FOUNDPRODUCT.attributes.cardDescription,
        category: products.GET_FOUNDPRODUCT.attributes.category,
        title: products.GET_FOUNDPRODUCT.attributes.title,
        label: selectCourseValue.value.label,
        image: tempImage,
        cost: tempCost 
      }
      products.inCart.push(tempData)
      buttonPlaceholder.value = 'Уже добавлено в корзину'
      disabled.value = true
      saveToCart(products.inCart)
    }
    function setProgram(value) {
      selectCourseValue.value = courseOptions.value.find(item => item.label === value)
    }
    onMounted(() => {
      products.inCart = checkCart()
      if (products.inCart.filter(item => item.id === Number(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length)))).length > 0) {
        buttonPlaceholder.value = 'Уже добавлено в корзину'
        disabled.value = true
      }
    })
    return {
      products,
      buttonPlaceholder,
      disabled,
      addToCart,
      selectCourseValue,
      courseOptions,
      setProgram,
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