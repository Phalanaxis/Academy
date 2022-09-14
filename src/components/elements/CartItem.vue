<template>
  <container-slot :class="{'cart-item': true, 'cart-item_disabled': disabled}">
    <div
      class="cart-item__cross"
      @click="$emit('deleteFromCart', id, type)"
    />
    <router-link
      :class="{'cart-item__link': true, 'cart-item__link_disabled': disabled}"
      :to="innerLink + linkTransform(title, id)"
    >
      <div class="cart-item__image-container">
        <img v-if="image.data !== null" class="cart-item__image" :src="link + image.data.attributes.url" />
      </div>
      <div class="cart-item__content">
        <div class="cart-item__title" v-html="title" />
        <div class="cart-item__program" v-html="label" />
      </div>
      <div class="cart-item__cost" v-html="cost + '&#8381;'" />
    </router-link>
  </container-slot>
</template>

<script>
import { ref, onMounted } from 'vue'
import linkTransform from '@/components/mixins/linkTransform'
import ContainerSlot from '@/components/ui/ContainerSlot.vue'
export default {
  mixins: [linkTransform],
  emits: ['deleteFromCart'],
  components: {
    ContainerSlot
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    cost: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ''
    },
    image: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup ({ type }) {
    const link = import.meta.env.VITE_UPLOADS_LINK
    const innerLink = ref('')

    onMounted(() => {
      if (type === 'webinar') {
        innerLink.value = '/webinars/'
      } else {
        innerLink.value = '/products/'
      }
    })
    return {
      link,
      innerLink
    }
  }
}
</script>

<style lang="scss" scoped>
  .cart-item {
    position: relative;
    height: 150rem;
    margin: 0 0 30px 0;
    transition: box-shadow .3s;
    @media screen and (max-width: 1280px) {
      height: 150px;
    }
    @media screen and (max-width: 680px) {
      height: 300px;
    }
    &:hover {
      box-shadow: 1px 1px 10px 1px rgb(12 12 12 / 20%);
    }
    &_disabled {
      opacity: 0.5;
      &:hover {
        box-shadow: none;
      }
    }
    &__link {
      text-decoration: none;
      display: flex;
      flex-direction: row;
      height: 100%;
      @media screen and (max-width: 680px) {
        flex-direction: column;
      }
      &_disabled {
        user-select: none;
        pointer-events: none;
      }
    }
    &__content {
      height: 100%;
      padding: 20rem 40rem 15rem 30rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: #644C5C;
    }
    &__program {
      padding: 0 100px 0 0;
    }
    &__cross {
      position: absolute;
      top: 15rem;
      right: 15rem;
      width: 15rem;
      height: 15rem;
      cursor: pointer;
      content: '';
      transition: transform .3s;
      &:hover {
        transform: scale(1.3);
      }
      &::after {
        position: absolute;
        top: 5rem;
        left: 0;
        width: 14rem;
        height: 2rem;
        content: '';
        background-color: #644C5C;
        transform: rotate(45deg)
      }
      &::before {
        position: absolute;
        top: 5rem;
        left: 0;
        width: 14rem;
        height: 2rem;
        content: '';
        background-color: #644C5C;
        transform: rotate(-45deg)
      }
      @media screen and (max-width: 680px) {
        &::after {
          background-color: #FFF;
        }
        &::before {
          background-color: #FFF;
        }
      }
    }
    &__image-container {
      width: 190rem;
      min-width: 190rem;
      height: 100%;
      border-radius: 20px 0 0 20px;
      background-image: url(../../assets/images/default.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      @media screen and (max-width: 680px) {
        width: 100%;
        min-height: 150px;
        height: 150px;
        border-radius: 20px 20px 0 0;
      }
    }
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px 0 0 20px;
      @media screen and (max-width: 680px) {
        width: 100%;
        height: 150px;
        border-radius: 20px 20px 0 0;
      }
    }
    &__title {
      font-weight: 600;
      font-size: 16rem;
      line-height: 24rem;
      color: #644C5C;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__cost {
      position: absolute;
      bottom: 15rem;
      right: 15rem;
      padding: 7rem 20rem;
      color: #644C5C;
      background-color: #FFF;
      font-weight: 600;
      font-size: 14rem;
      line-height: 20rem;
      border-radius: 20rem;
      @media screen and (max-width: 680px) {
        bottom: unset;
        right: unset;
        top: 100px;
        left: 15px;
      }
    }
  }
</style>