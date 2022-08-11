<template>
  <container-slot class="cart-item">
    <div
      class="cart-item__cross"
      @click="$emit('deleteFromCart', id)"
    />
    <router-link
      class="cart-item__link"
      :to="'/products/' + linkTransform(title, id)"
    >
      <img class="cart-item__image" :src="link + image" />
      <div class="cart-item__content">
        <div class="cart-item__title" v-html="title" />
        <div class="cart-item__program" v-html="label" />
      </div>
      <div class="cart-item__cost" v-html="cost + '&#8381;'" />
    </router-link>
  </container-slot>
</template>

<script>
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
      type: String,
      default: ''
    }
  },
  setup () {
    const link = import.meta.env.VITE_UPLOADS_LINK
    return {
      link
    }
  }
}
</script>

<style lang="scss" scoped>
  .cart-item {
    position: relative;
    height: 150rem;
    margin: 0 0 30px 0;
    transition: transform .3s, box-shadow .3s;
    &:hover {
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
      transform: scale(1.01);
    }
    &__link {
      text-decoration: none;
      display: flex;
      flex-direction: row;
      height: 100%;
    }
    &__content {
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
    }
    &__image {
      width: 190rem;
      object-fit: cover;
      border-radius: 20px 0 0 20px;
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
    }
  }
</style>