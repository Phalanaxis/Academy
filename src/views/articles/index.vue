<template>
  <section class="articles">
    <ui-title>Статьи</ui-title>
    <tagged-cards-list :list="articles.GET_ARTICLES" mainLink="/articles/" />
  </section>
</template>

<script>
import { onMounted } from 'vue'
import { useArticlesStore } from '@/stores/articles'
import TaggedCardsList from '@/components/blocks/TaggedCardsList.vue'
import UiTitle from '@/components/ui/UiTitle.vue'
export default {
  components: {
    TaggedCardsList,
    UiTitle
  },
  provide: {
    isTagged: true,
    isPriced: false,
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
  }
</style>