<template>
  <div v-if="list.length > 0">
    <container-slot class="cart__price-counter">
      <div class="cart__price-calc">
        <div class="cart__price-box">
          <div class="cart__price-text">
            Общая сумма
          </div>
          <div class="cart__price-number" v-html="calculatePrice(list) + ' &#8381;'" />
        </div>
        <div class="cart__price-box">
          <div class="cart__price-text">
            Скидка
          </div>
          <div v-if="discountPrice === ''" class="cart__price-number" v-html="'-'" />
          <div v-else class="cart__price-number" v-html="discountPrice + '%'" />
        </div>
      </div>
      <div class="cart__price-box">
        <div class="cart__price-text">
          Итого
        </div>
        <div v-if="discountPrice === ''" class="cart__price-number" v-html="calculatePrice(list)" />
        <div v-else class="cart__price-number" v-html="calculatePrice(list) * (1 - discountPrice/100)" />
      </div>
      <div class="cart__promo-container">
        <n-input
          class="cart__promo-input"
          placeholder="Введите промокод"
          v-model:value="promoInput"
          @keydown.enter="sendPromo"
        />
      </div>
    </container-slot>
    <square-button
      class="cart__payment-button"
      @click="pay(list)"
      :buttonPlaceholder="buttonPlaceholder"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useProductsStore } from '@/stores/products'
import ContainerSlot from '@/components/ui/ContainerSlot.vue'
import SquareButton from '@/components/ui/SquareButton.vue'
export default {
  components: {
    ContainerSlot,
    SquareButton
  },
  data () {
    return {
      buttonPlaceholder: 'Корзина пуста',
      finalPrice: '-',
      disabled: true
    }
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  watch: {
    'list.length': {
      handler () {
        this.checkCart()
      }
    }
  },
  mounted () {
    this.checkCart()
  },
  methods: {
    checkCart () {
      if (this.list.length > 0) {
        this.buttonPlaceholder = 'Оплатить',
        this.disabled = false
      } else {
        this.buttonPlaceholder = 'Корзина пуста',
        this.disabled = true
      }
    }
  },
  setup () {
    const profile = useProfileStore()
    const products = useProductsStore()
    const overalPrice = ref('-')
    const discountPrice = ref('')
    const promoInput = ref('')

    function calculatePrice (list) {
      let tempPrice = 0
      if (list.length > 0) {
        list.map(item => tempPrice = +tempPrice + item.cost)
        return tempPrice
      } else {
        return '-'
      }
    }
    function pay(list) {
      profile.sendPayment(list, discountPrice.value)
    }
    function sendPromo () {
      profile.getPromos(promoInput.value).then((result) => {
        if (result !== null) {
          discountPrice.value = result
        }
      })
    }
    return {
      profile,
      products,
      overalPrice,
      discountPrice,
      calculatePrice,
      pay,
      promoInput,
      sendPromo
    }
  }
}
</script>

<style lang="scss" scoped>
  .cart {
    &__price-counter {
      width: 300rem;  
      padding: 30px 0 20px;
      @media screen and (max-width: 1280px) {
        width: 100%;
      }
    }
    &__price-number {
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: #644C5C;
    }
    &__price-calc {
      border-bottom: 1px solid #D8D8D8;
    }
    &__price-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      &:nth-child(2) {
        margin: 20px 0 20px 0;
      }
      @media screen and (max-width: 1280px) {
        padding: 0 40px;
      }
    }
    &__price-text {
      font-weight: 600;
      font-size: 14rem;
      line-height: 18px;
      letter-spacing: 0.03ch;
      color: #78353E;
    }
    &__promo-container {
      padding: 0 15px;
      @media screen and (max-width: 1280px) {
        padding: 0 20px;
      }
    }
    &__promo-input {
      --n-height: 48px!important;
      --n-border: 1px solid #D8D8D8!important;
      --n-border-radius: 10px!important;
    }
    &__payment-button {
      margin: 30rem 0 0 0;
      width: 300rem;
      height: 50px;
      @media screen and (max-width: 1280px) {
        margin: 20px 0 0 0;
        width: 100%;
      }
      @media screen and (max-width: 680px) {
        margin: 30px 0 0 0;
      }
    }
  }
</style>