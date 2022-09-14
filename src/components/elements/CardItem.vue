<template>
  <container-slot class="card" color="#F3F0EC">
    <router-link class="card__link" :to="mainLink + linkTransform(title, id)">
      <div class="card__image-container">
        <img v-if="image !== null" class="card__image" :src="link + image.attributes.url" alt="" />
        <div
          v-if="isTagged"
          class="card__tag"
          v-html="tag"
          :style="'background-color:' + tagColor"
        />
      </div>
      <div class="card__card-info">
        <h4
          class="card__card-title"
          v-html="title"
        />
        <div class="card__card-description" v-html="description" />
        <button-arrow :class="{'card__card-button': true, 'card__card-button-disabler': cost}" text="Подробнее" />
        <div
          v-if="cost && isCost"
          class="card__cost"
          v-html="cost + '&#8381;'"
        />
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
  inject: ['isTagged'],
  components: {
    ButtonArrow,
    ContainerSlot
  },
  data () {
    return {
      link: import.meta.env.VITE_UPLOADS_LINK
    }
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
    tag: {
      type: String,
      default: ''
    },
    tagColor: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    cost: {
      type: Number,
      default: 0
    },
    image: {
      type: Object,
      default: () => {}
    },
    mainLink: {
      type: String,
      default: '/'
    },
    isCost: {
      type: Boolean,
      defalut: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    width: 100%;
    height: 480rem;
    position: relative;
    overflow: hidden;
    transition: box-shadow .3s;
    &:hover {
      box-shadow: 1px 1px 10px 1px rgb(12 12 12 / 20%);
    }
    &__link {
      text-decoration: none;
    }
    &__image-container {
      position: relative;
      width: 100%;
      height: 200rem;
      object-fit: cover;
      background-color: rgb(243, 240, 236);
      background-image: url(../../assets/images/default.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px 20px 0 0;
    }
    &__tag {
      position: absolute;
      bottom: 10rem;
      left: 20rem;
      padding: 4px 40rem;
      border-radius: 10rem;
      font-weight: 600;
      font-size: 14rem;
      line-height: 20rem;
      color: #FFF;
      max-width: 80%;
      max-height: 75px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
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
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      &::first-letter {
        text-transform: uppercase;
      }
    }
    &__card-description {
      font-weight: 500;
      font-size: 14rem;
      line-height: 20rem;
      color: #644C5C;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__card-button {
      position: absolute;
      bottom: 25rem;
      &-disabler {
        @media screen and (max-width: 1350px) {
          &:deep(svg) {
            display: none;
          }
        }
      }
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