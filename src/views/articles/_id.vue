<template>
  <div v-if="storeArticles.GET_FOUNDARTICLE.attributes" class="article">
    <div class="article__data-container">
      <div class="article__data-box">
        <div class="article__data-original" v-html="formDate(storeArticles.GET_FOUNDARTICLE.attributes.date)" />
      </div>
      <h3 class="article__title" v-html="storeArticles.GET_FOUNDARTICLE.attributes.title" />
      <img v-if = "storeArticles.GET_FOUNDARTICLE.attributes.image.data" class="article__image" :src="link + storeArticles.GET_FOUNDARTICLE.attributes.image.data.attributes.url" />
      <div class="article__description" v-html="storeArticles.GET_FOUNDARTICLE.attributes.description" />
      <div class="article__button-link-container">
        <spiral-button class="article__button" text="Все статьи" url="/articles" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
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
  .article {
    width: 100%;
    min-height: 100vh;
    padding: 90rem 20% 140rem 110rem;
    @media screen and (max-width: 1280px) {
      padding: 50px 60px 100px 60px;
    }
    @media screen and (max-width: 680px) {
      padding: 40px 25px 100px 25px;
    }
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
      @media screen and (max-width: 1280px) {
        height: 300px;
      }
      @media screen and (max-width: 680px) {
        height: 200px;
      }
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