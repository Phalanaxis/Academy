<template>
  <section class="items">
    <div v-if="profile.courses !== null && profile.courses.length > 0" class="items__webinars-section">
      <ui-title class="items__title">
        Ваши курсы
      </ui-title>
      <simple-list class="items__list" :list="courseItems" mainLink="/courses/"  />
    </div>
    <div v-if="profile.webinars !== null && profile.webinars.length > 0" class="items__webinars-section">
      <ui-title class="items__title">
        Вебинары
      </ui-title>
      <simple-list class="items__list" :list="webinarItems" :isCost="false" mainLink="/courses/webinar/"  />
    </div>
    <div v-if="profile.webinars.length === 0 && profile.courses.length === 0" class="items__none">
      Вы еще ничего не приобрели.
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useWebinarsStore } from '@/stores/webinars'
import { useProductsStore } from '@/stores/products'
import CardItem from '@/components/elements/CardItem.vue'
import SimpleList from '@/components/blocks/SimpleList.vue'
import UiTitle from '@/components/ui/UiTitle.vue'
export default {
  components: {
    CardItem,
    SimpleList,
    UiTitle
  },
  provide: {
    isTagged: false,
    isPriced: false,
    mainLink: 'aaa'
  },
  setup () {
    const profile = useProfileStore()
    const webinars = useWebinarsStore()
    const products = useProductsStore()
    const webinarItems = ref([])
    const courseItems = ref([])
    webinars.fetchWebinars().then(() => {
      let indexArray = profile.webinars.map(item => item.id)
      indexArray.forEach(item => {
        webinarItems.value.push(webinars.webinars.find(webinarItem => webinarItem.id === item))
      })
    })
    products.fetchProducts().then(() => {
      let indexArray = profile.courses.map(item => item.id)
      indexArray.forEach(item => {
        courseItems.value.push(products.products.find(productItem => productItem.id === item))
      })
    })

    return {
      profile,
      webinars,
      webinarItems,
      courseItems
    }
  }
}
</script>

<style lang="scss" scoped>
  .items {
    width: 100%;
    &__title {
      margin: 0;
    }
    &__list {
      margin: 50rem 0 30rem 0;
    }
    &__none {
      font-weight: 500;
      font-size: 18rem;
      margin: 100rem 0 0 0;
      color: #644C5C;
    }
  }
</style>