<template>
  <section v-if="webinars.GET_FOUNDWEBINAR" class="webinar">
    <div
      v-if="webinars.GET_FOUNDWEBINAR.attributes"
      class="webinar__preview"
    >
      <div class="webinar__image-container">
        <img
          v-if="webinars.GET_FOUNDWEBINAR.attributes.image.data"
          class="webinar__image" :src="link + webinars.GET_FOUNDWEBINAR.attributes.image.data.attributes.url"
        />
      </div>
      <div class="webinar__info-box">
        <h3 class="webinar__title" v-html="webinars.GET_FOUNDWEBINAR.attributes.title" />
        <div class="webinar__cost-container">
          <div class="webinar__cost-box">
            <div class="webinar__cost-numbers">
              <div
                v-if="webinars.GET_FOUNDWEBINAR.attributes.discount && webinars.GET_FOUNDWEBINAR.attributes.cost"
                class="webinar__cost"
                v-html=" Math.round((webinars.GET_FOUNDWEBINAR.attributes.cost)/100 * (100 - webinars.GET_FOUNDWEBINAR.attributes.discount))"
              />
              <div
                v-if="webinars.GET_FOUNDWEBINAR.attributes.cost"
                :class="{'webinar__cost': true, 'webinar__cost_with-discount': webinars.GET_FOUNDWEBINAR.attributes.discount}" 
                v-html="webinars.GET_FOUNDWEBINAR.attributes.cost + '&#8381;'"
              />
              <div 
                v-else
                class="webinar__discount"
                v-html="'Бесплатно'"
              />
            </div>
            <div
              v-if="webinars.GET_FOUNDWEBINAR.attributes.discount"
              class="webinar__discount"
              v-html="webinars.GET_FOUNDWEBINAR.attributes.discount + '%'"
            />
          </div>
          <square-button
            class="webinar__cart-button"
            :buttonPlaceholder="buttonPlaceholder"
            @click="addToCart()"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <div v-if="webinars.GET_FOUNDWEBINAR.attributes" class="webinar__description" v-html="webinars.GET_FOUNDWEBINAR.attributes.description" />
    <div class="webinar__cost-container-mobile">
      <div class="webinar__cost-box">
        <div class="webinar__cost-numbers">
          <div
            v-if="webinars.GET_FOUNDWEBINAR.attributes.discount && webinars.GET_FOUNDWEBINAR.attributes.cost"
            class="webinar__cost"
            v-html=" Math.round((webinars.GET_FOUNDWEBINAR.attributes.cost)/100 * (100 - webinars.GET_FOUNDWEBINAR.attributes.discount))"
          />
          <div
            v-if="webinars.GET_FOUNDWEBINAR.attributes.cost"
            :class="{'webinar__cost': true, 'webinar__cost_with-discount': webinars.GET_FOUNDWEBINAR.attributes.discount}" 
            v-html="webinars.GET_FOUNDWEBINAR.attributes.cost + '&#8381;'"
          />
          <div 
            v-else
            class="webinar__discount"
            v-html="'Бесплатно'"
          />
        </div>
        <div
          v-if="webinars.GET_FOUNDWEBINAR.attributes.discount"
          class="webinar__discount"
          v-html="webinars.GET_FOUNDWEBINAR.attributes.discount + '%'"
        />
      </div>
      <square-button
        class="webinar__cart-button"
        :buttonPlaceholder="buttonPlaceholder"
        @click="addToCart()"
        :disabled="disabled"
      />
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useWebinarsStore } from '@/stores/webinars'
import { useProductsStore } from '@/stores/products'
import { useProfileStore } from '@/stores/profile'
import SquareButton from '@/components/ui/SquareButton.vue'
export default {
  components: {
    SquareButton
  },
  setup () {
    const webinars = useWebinarsStore()
    const products = useProductsStore()
    const profile = useProfileStore()
    const route = useRoute()
    const buttonPlaceholder = ref('В корзину')
    const disabled = ref(false)
    const link = import.meta.env.VITE_UPLOADS_LINK

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
        let tempCost
        let tempImage = null
        if (webinars.GET_FOUNDWEBINAR.attributes.image.data !== null) {
          tempImage = webinars.GET_FOUNDWEBINAR.attributes.image.data.attributes.url
        }
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
        disabled.value = true
        buttonPlaceholder.value = 'Уже добавлено в корзину'
        saveToCart(products.inCart)
      } else {
        profile.installWebinar(webinars.GET_FOUNDWEBINAR.id).then((result) => {
          if (result) {
            disabled.value = true
            buttonPlaceholder.value = 'Уже приобретено'
          }
        })
      }
    }
    onMounted(() => {
      webinars.fetchWebinars().then((result) => {
        if (result === true) {
          webinars.searchWebinar(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length)))
          if (!webinars.GET_FOUNDWEBINAR.attributes.cost) {
            buttonPlaceholder.value = 'Добавить'
          }
          products.inCart = checkCart()
          if (products.inCart.filter(item => item.type === 'webinar').find(item => item.id === Number(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length))))) {
            disabled.value = true
            buttonPlaceholder.value = 'Уже добавлено в корзину'
          }
          if (profile.webinars.find(item => item.id === Number(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length))))) {
            disabled.value = true
            buttonPlaceholder.value = 'Уже приобретено'
          }
        }
      })
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
  .webinar {
    width: 100%;
    min-height: 100vh;
    padding: 190rem 75rem 140rem 110rem;
    @media screen and (max-width: 1280px) {
      padding: 70px 60px;
    }
    &__preview {
      display: flex;
      @media screen and (max-width: 1280px) {
        flex-direction: column-reverse;
      }
    }
    &__image-container {
      width: calc(100% - 330rem);
      height: 360rem;
      object-fit: cover;
      background-color: rgb(243, 240, 236);
      background-image: url(../../assets/images/default.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      border-radius: 15px;
      @media screen and (max-width: 1280px) {
        width: 100%;
      }
      @media screen and (max-width: 680px) {
        height: 200px;
      }
    }
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 15px;
    }
    &__info-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 300rem;
      margin: 0 0 0 30px;
      @media screen and (max-width: 1280px) {
        margin: 0 0 40px 0;
        width: 100%;
      }
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
    &__cost-container {
      @media screen and (max-width: 1280px) {
        display: none;
      }
      &-mobile {
        margin: 40px 0 0 0;
        @media screen and (min-width: 1281px) {
          display: none;
        }
      }
    }
    &__cost-numbers {
      display: flex;
      align-items: center;
    }
    &__cart-button {
      width: 300rem;
      height: 50rem;
      @media screen and (max-width: 1280px) {
        width: 100%;
      }
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
      font-size: 14rem;
      line-height: 22rem;
      color: #FFF;
      padding: 5rem 15rem;
      background-color: #644C5C;
      border-radius: 16rem;
    }
    &__select:deep(.n-base-selection) {
      margin: 0 0 15rem 0;
    }
    &__description {
      max-width: calc(100% - 330rem );
      margin: 40rem 0 0 0;
      font-size: 14rem;
      overflow: hidden;
      @media screen and (max-width: 1280px) {
        margin: 25rem 0 0 0;
        max-width: 100%;
      }
    }
  }
</style>