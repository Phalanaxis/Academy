<template>
  <container-slot class="cart__price-counter">
    <div class="cart__price-calc">
      <div class="cart__price-box">
        <div class="cart__price-text">
          Общая сумма
        </div>
        <div class="cart__price-number" v-html="overalPrice" />
      </div>
      <div class="cart__price-box">
        <div class="cart__price-text">
          Скидка
        </div>
        <div class="cart__price-number" v-html="discountPrice" />
      </div>
    </div>
    <div class="cart__price-box cart__price-final">
      <div class="cart__price-text">
        Итого
      </div>
      <div class="cart__price-number" v-html="finalPrice" />
    </div>
    <div class="cart__promo-container">
      <n-input
        class="cart__promo-input"
        placeholder="Введите промокод"
      />
    </div>
  </container-slot>
  <square-button
    class="cart__payment-button"
    :buttonPlaceholder="buttonPlaceholder"
    :disabled="disabled"
  />
</template>

<script>
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
      overalPrice: '-',
      discountPrice: '-',
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
  }
}
</script>

<style lang="scss" scoped>
  .cart {
    &__price-counter {
      width: 300rem;  
      padding: 30px 0 20px 0;
    }
    &__price-calc {
      border-bottom: 1px solid #D8D8D8;
      padding: 0 30px 20px 30px;
    }
    &__price-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:nth-child(1) {
        margin: 0 0 20px 0;
      }
    }
    &__price-text {
      font-weight: 600;
      font-size: 14rem;
      line-height: 18px;
      letter-spacing: 0.03ch;
      color: #78353E;
    }
    &__price-final {
      padding: 20px 30px 30px 30px;
    }
    &__promo-container {
      padding: 0 15px;
    }
    &__promo-input {
      --n-height: 48px!important;
      --n-border: 1px solid #D8D8D8!important;
      --n-border-radius: 10px!important;
    }
    &__payment-button {
      margin: 30px 0 0 0;
      width: 300px;
    }
  }
</style>