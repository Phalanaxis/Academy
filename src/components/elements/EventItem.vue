<template>
  <container-slot class="product" color="#F3F0EC">
    <router-link class="product__link" :to="'/events/' + linkTransform(title, id)">
      <div class="product__image-container">
        <img v-if="image !== null" class="product__image" :src="link + image.attributes.url" alt="" />
      </div>
      <div class="product__card-info">
        <h4
          class="product__card-title"
          v-html="formDate(date)"
        />
        <div class="product__card-description" v-html="title" />
        <button-arrow class="product__card-button" text="Подробнее" />
      </div>
    </router-link>
  </container-slot>
</template>

<script>
import ButtonArrow from '@/components/ui/ButtonArrow.vue'
import ContainerSlot from '@/components/ui/ContainerSlot.vue'
import linkTransform from '@/components/mixins/linkTransform'
export default {
  mixins: [linkTransform],
  components: {
    ButtonArrow,
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
    type: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: 'Дата еще не определена'
    },
    image: {
      type: Object,
      default: () => {}
    }
  },
  setup () {
    const link = import.meta.env.VITE_UPLOADS_LINK
    function formDate (date) {
      let newDate = new Date(date)
      return newDate.getDate() + '.' + (newDate.getMonth() + 1) + '.' + newDate.getFullYear()
    }
    return {
      link,
      formDate
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/core.scss';
  .product {
    width: 100%;
    height: 17vw;
    position: relative;
    &__link {
      text-decoration: none;
      display: flex;
      height: 100%;
    }
    &__image-container {
      position: relative;
      width: 45%;
      height: 100%;
      object-fit: cover;
    }
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px 0px 0 20px;
    }
    &__card-info {
      width: 55%;
      padding: 20rem 20rem 20rem 30rem;
    }
    &__card-title {
      font-size: 14rem;
      line-height: 20rem;
      font-weight: 600;
      color: #C9C0C5;
      margin: 0 0 10rem 0;
      &::first-letter {
        text-transform: uppercase;
      }
    }
    &__card-description {
      font-size: 14rem;
      line-height: 20rem;
      color: #644C5C;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__card-button {
      position: absolute;
      bottom: 20rem;
    }
    &__cost {
      position: absolute;
      right: 15px;
      bottom: 15px;
      font-weight: 600;
      font-size: 14rem;
      line-height: 20px;
      color: #644C5C;
      padding: 8px 20px;
      background-color: #FFF;
      border-radius: 20px;
    }
  }
</style>