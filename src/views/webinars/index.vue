<template>
  <div class="webinars">
    <h2 class="webinars__title">Вебинары</h2>
    <webinar-list :list="webinars.GET_WEBINARS" />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useWebinarsStore } from '@/stores/webinars'
import WebinarList from '@/components/blocks/WebinarList.vue'
export default {
  setup () {
    const webinars = useWebinarsStore()
    onMounted(() => {
      webinars.fetchWebinars()
    }) 
    return {
      webinars
    }
  },
  components: {
    WebinarList
  }
}
</script>

<style lang="scss" scoped>
  .webinars {
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