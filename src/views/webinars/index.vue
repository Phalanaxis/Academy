<template>
  <section class="webinars">
    <ui-title>Вебинары</ui-title>
    <simple-list :list="webinars.GET_WEBINARS" :isCost="true" mainLink="/webinars/" />
  </section>
</template>

<script>
import { onMounted } from 'vue'
import { useWebinarsStore } from '@/stores/webinars'
import SimpleList from '@/components/blocks/SimpleList.vue'
import UiTitle from '@/components/ui/UiTitle.vue'
export default {
  components: {
    SimpleList,
    UiTitle
  },
  provide: {
    isTagged: false
  },
  setup () {
    const webinars = useWebinarsStore()
    onMounted(() => {
      webinars.fetchWebinars()
    }) 
    return {
      webinars
    }
  }
}
</script>

<style lang="scss" scoped>
  .webinars {
    width: 100%;
    min-height: 100vh;
  }
</style>