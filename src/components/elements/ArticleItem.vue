<template>
  <container-slot class="article" color="#F3F0EC">
    <router-link class="article__link" :to="'/articles/' + linkTransform(title, id)">
      <div class="article__image-container">
        <img v-if="image !== null" class="article__image" :src="link + image.attributes.url" alt="" />
        <div
          class="article__tag"
          v-html="tag"
          :style="'background-color:' + tagColor"
        />
      </div>
      <div class="article__card-info">
        <div class="article__card-date" v-html="formDate(date)" />
        <h4
          class="article__card-title"
          v-html="title"
        />
        <div class="article__card-description" v-html="description" />
        <button-arrow class="article__card-button" text="Подробнее" />
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
    date: {
      type: String,
      default: ''
    },
    image: {
      type: Object,
      default: () => {}
    }
  },

  setup () {
    function formDate (date) {
      let newDate = new Date(date)
      return newDate.getDate() + '.' + (newDate.getMonth() + 1) + '.' + newDate.getFullYear()
    }
    return {
      formDate
    }
  }
}
</script>

<style lang="scss" scoped>
  .article {
    width: 100%;
    height: 480rem;
    position: relative;
    overflow: hidden;
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
      // word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__card-info {
      padding: 15rem 15rem 15rem 20rem;
    }
    &__card-date {
      color: #C9C0C5;
      font-size: 14rem;
      margin: 0 0 15rem 0;
    }
    &__card-title {
      font-size: 16rem;
      line-height: 24rem;
      font-weight: 600;
      color: #644C5C;
      margin: 0 0 15rem 0;
      word-break: break-all;
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
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__card-button {
      position: absolute;
      bottom: 25rem;
    }
  }
</style>