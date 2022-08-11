<template>
  <div v-if="storeArticles.GET_FOUNDARTICLE.attributes" class="event">
    <div class="event__data-container">
      <div class="event__data-box">
        <div class="event__data-original" v-html="formDate(storeArticles.GET_FOUNDARTICLE.attributes.date)" />
      </div>
      <h3 class="event__title" v-html="storeArticles.GET_FOUNDARTICLE.attributes.title" />
      <img v-if = "storeArticles.GET_FOUNDARTICLE.attributes.image.data" class="event__image" :src="link + storeArticles.GET_FOUNDARTICLE.attributes.image.data.attributes.url" />
      <div class="event__description" v-html="storeArticles.GET_FOUNDARTICLE.attributes.description" />
      <div class="event__button-link-container">
        <spiral-button class="event__button" text="Все статьи" url="/articles" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import SpiralButton from '@/components/ui/SpiralButton.vue'
export default {
  components: {
    SpiralButton
  },
  setup () {
    const storeArticles = useArticlesStore()
    const route = useRoute()
    const link = import.meta.env.VITE_UPLOADS_LINK
    function formDate (date) {
      let newDate = new Date(date)
      return newDate.getDate() + '.' + (newDate.getMonth() + 1) + '.' + newDate.getFullYear()
    }
    onMounted (() => {
      storeArticles.fetchArticles().then((result) => {
        if (result === true) {
          storeArticles.searchArticle(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length)))
        }
      })
    })
    return {
      storeArticles,
      link,
      formDate
    }
  }
}
</script>

<style lang="scss" scoped>
  .event {
    width: 100%;
    min-height: 100vh;
    background-color: #FBFAF9;
    padding: 90rem 20% 140rem 110rem;
    &__data-box {
      display: flex;
      font-size: 14rem;
    }
    &__data-original {
      color: #644C5C;
      word-spacing: 25rem;
    }
    &__title {
      margin: 30rem 0 0 0;
      font-weight: 600;
      font-size: 24rem;
      line-height: 30rem;
      color: #644C5C;
      word-break: break-all;
    }
    &__image {
      margin: 50rem 0 0 0;
      width: 100%;
      max-height: 360rem;
      object-fit: cover;
      border-radius: 15px;
    }
    &__description {
      margin: 40rem 0 0 0;
      font-size: 14rem;
      word-break: break-all;
    }
    &__button-link-container {
      display: flex;
      justify-content: center;
      margin: 100rem 0 0 0;
    }
  }
</style>