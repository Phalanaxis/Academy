<template>
  <div class="articles">
    <h2 class="articles__title">Статьи</h2>
    <articles-list :list="articles.GET_ARTICLES" />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useArticlesStore } from '@/stores/articles'
import ArticlesList from '@/components/blocks/ArticlesList.vue'
export default {
  components: {
    ArticlesList
  },
  setup () {
    const articles = useArticlesStore()
    onMounted(() => {
      articles.fetchArticles()
    }) 
    return {
      articles
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/core.scss';
  .articles {
    width: 100%;
    min-height: 100vh;
    padding: 60rem 75rem 50rem 30rem;
    background-color: #FBFAF9;
    &__title {
      margin: 0;
      font-size: 40rem;
      line-height: 60rem;
      font-weight: 600;
      color: #644C5C;
    }
  }
</style>