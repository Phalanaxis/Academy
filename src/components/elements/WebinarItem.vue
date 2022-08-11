<template>
  <container-slot class="webinar" color="#F3F0EC">
    <router-link class="webinar__link" :to="'/webinars/' + linkTransform(title, id)">
      <div class="webinar__image-container">
        <img v-if="image !== null" class="webinar__image" :src="link + image.attributes.url" alt="" />
      </div>
      <div class="webinar__card-info">
        <h4
          class="webinar__card-title"
          v-html="title"
        />
        <div class="webinar__card-description">
          {{ description }}
        </div>
        <button-arrow class="webinar__card-button" text="Подробнее" />
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
    description: {
      type: String,
      default: ''
    },
    image: {
      type: Object,
      default: () => {}
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
  .webinar {
    width: 100%;
    height: 480rem;
    position: relative;
    &__link {
      text-decoration: none;
    }
    &__image-container {
      position: relative;
      width: 100%;
      height: 200rem;
      object-fit: cover;
    }
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20rem 20rem 0 0;
    }
    &__tag {
      position: absolute;
      bottom: 10rem;
      left: 20rem;
      padding: 7rem 40rem;
      border-radius: 10rem;
      font-weight: 600;
      font-size: 14rem;
      line-height: 20rem;
      color: #FFF;
    }
    &__card-info {
      padding: 15rem 15rem 15rem 20rem;
    }
    &__card-title {
      font-size: 16rem;
      line-height: 24rem;
      font-weight: 600;
      color: #644C5C;
      margin: 0 0 15rem 0;
      &::first-letter {
        text-transform: uppercase;
      }
    }
    &__card-description {
      font-weight: 500;
      font-size: 14rem;
      line-height: 20rem;
      color: #644C5C;
    }
    &__card-button {
      position: absolute;
      bottom: 25rem;
    }
    &__cost {
      position: absolute;
      right: 15rem;
      bottom: 15rem;
      font-weight: 600;
      font-size: 14rem;
      line-height: 20rem;
      color: #644C5C;
      padding: 8rem 20rem;
      background-color: #FFF;
      border-radius: 20rem;
    }
  }
</style>