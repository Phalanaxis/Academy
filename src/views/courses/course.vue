<template>
  <section v-if="currentProduct.attributes" class="course">
    <div class="course__title" @click="searchLesson()" v-html="currentProduct.attributes.title" />
    <div class="course__theme">
      {{ lesson.lessonName }}
    </div>
    <div v-if="lesson.lector.data" class="course__lector-title">
      Лектор урока
    </div>
    <div v-if="lesson.lector.data" class="course__lector-block">
      <div class="course__lector-info">
        <img class="course__lector-photo" src="/src/assets/images/avatar.jpg"/>
        <div class="course__lector-name">
          {{ lesson.lector.data.attributes.name }}
        </div>
        <a class="course__lector-mail" :href="'mailto:@' + lesson.lector.data.attributes.mail">
          {{ lesson.lector.data.attributes.mail }}
        </a>
      </div>
      <ul class="course__lector-benefits">
        <li 
          v-for="(item) in lesson.lector.data.attributes.qualification"
          :key="item.id"
          class="course__lector-benefit"
        >
          {{ item.item }}
        </li>
      </ul>
    </div>
    <div class="course__content" v-html="lesson.lessonContent" />
    <!-- <video
      v-if="lesson.video"
      controls
      class="course__video"
      :src="link + lesson.video.data.attributes.url"
    >
    </video> -->
    <!-- <audio
      class="course__audio"
      controls
      src=""
    >
    </audio> -->
    <div v-if="lesson.files.data" class="course__files">
      <File
        class="course__file"
        v-for="(item) in lesson.files.data"
        :key="item.id"
        :text="item.attributes.name"
        :url="item.attributes.url"
      />
    </div>
    <div class="course__button">
      <spiral-button v-if="hashArray[hashArray.indexOf($route.hash) + 1] !== undefined" text="Следующий урок" @click="switchLesson()" />
      <spiral-button v-else text="Назад" @click="switchLesson()" url="/courses" />
    </div>
  </section>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import File from '@/components/elements/File.vue'
import SpiralButton from '@/components/ui/SpiralButton.vue'
export default {
  components: {
    File,
    SpiralButton
  },
  setup () {
    const products = useProductsStore()
    const route = useRoute()
    const router = useRouter()
    const link = import.meta.env.VITE_UPLOADS_LINK
    const lesson = ref('')

    const currentProduct = ref('')
    const hashArray = ref([])

    onMounted(() => {
      if (products.GET_FOUNDPRODUCT === null || products.GET_FOUNDPRODUCT.id !== Number(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length)))) {
        Promise.allSettled([
          products.fetchOneProduct(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length)))
        ]).then(() => {
          currentProduct.value = products.GET_FOUNDPRODUCT
          collectHash()
          CheckHash()
        })
      } else {
        currentProduct.value = products.GET_FOUNDPRODUCT
        collectHash()
        CheckHash()
      }
    })

    watch(route, (newValue) => {
      if ( newValue.path === '/courses/' + newValue.params.id) {
        searchLesson()
      }
    })

    function CheckHash () {
      if (!router.currentRoute.value.hash) {
        let tempHash = '#' + 1 + '-' + 1
        router.replace({ hash: tempHash })
      }
      searchLesson()
    }

    function searchLesson() {
      const hashParams = (route.hash.length > 0) ? route.hash.slice(1, route.hash.length).split('-') : ['1', '1']
      lesson.value = currentProduct.value.attributes.courseBlocks[hashParams[0] - 1].lessons[hashParams[1] - 1]
    }

    function collectHash() {
      currentProduct.value.attributes.courseBlocks.forEach(blockItem => blockItem.lessons.forEach(item => {
        hashArray.value.push('#' + (currentProduct.value.attributes.courseBlocks.indexOf(blockItem) + 1) + '-' + (blockItem.lessons.indexOf(item) + 1))
      }))
    }

    function switchLesson() {
      if (hashArray.value[hashArray.value.indexOf(route.hash) + 1] !== undefined) {
        router.replace(hashArray.value[hashArray.value.indexOf(route.hash) + 1])
      }
    }

    return {
      products,
      currentProduct,
      switchLesson,
      hashArray,
      lesson,
      link,
    }
  }
}
</script>

<style lang="scss" scoped>
.course {
  width: 100%;
  min-height: 100vh;
  padding: 150rem 20% 50rem 110rem;
  @media screen and (max-width: 1280px) {
    padding: 65px 60px;
  }
  @media screen and (max-width: 680px) {
    padding: 80px 25px 50px 25px;
  }
  &__title {
    font-weight: 600;
    font-size: 24rem;
    line-height: 36rem;
    color: #644C5C;
    margin-bottom: 20rem;
  }
  &__theme {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #644C5C;
    margin-bottom: 47px;
  }
  &__lector {
    &-title {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      color: #644C5C;
      margin-bottom: 21px;
    }
    &-block {
      width: 100%;
      background: #FBFAF9;
      border: 1px solid #D8D8D8;
      border-radius: 10px;
      display: flex;
      margin-bottom: 30rem;
      @media screen and (max-width: 680px) {
        flex-direction: column;
      }
    }
    &-info {
      padding: 30px 47px 30px 30px;
      border-right: 1px solid #D8D8D8;
      @media screen and (max-width: 680px) {
        border-right: none;
        border-bottom: 1px solid #D8D8D8;
      }
    }
    &-photo {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      margin-bottom: 14px;
    }
    &-name {
      font-size: 14px;
      font-weight: 500;
      line-height: 19px;
      color: #000;
      margin-bottom: 3px;
    }
    &-mail {
      font-size: 10px;
      font-weight: 400;
      line-height: 19px;
      color: #6D6D6D;
      text-decoration: none;
    }
    &-benefits {
      padding: 30px 47px 30px 30px;
    }
    &-benefit {
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      color: #644C5C;
      &::marker {
        font-size: 10px;
      }
    }
  }
  &__content {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: #644C5C;
    margin-bottom: 48px;
  }
  &__video {
    width: 100%;
    margin-bottom: 48px;
    border-radius: 15px;
  }
  &__audio {
    display: block;
    box-sizing: content-box;
    padding: 30px 35px 35px 33px;
    width: 100%;
    background: #E0DBDE;
    border-radius: 20px;
    margin-bottom: 30px;
      &::-webkit-media-controls-enclosure {
      border-radius: 2px;
      background: #E0DBDE;
    }
  }
  &__files {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media screen and (max-width: 1280px) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 680px) {
      grid-template-columns: 1fr;
    }
  }
  &__file {
    margin-bottom: 102px;
  }
  &__button {
    display: flex;
    justify-content: center;
    margin: 100rem 0 50rem 0;

  }
}
</style>