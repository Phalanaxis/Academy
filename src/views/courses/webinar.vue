<template>
  <section v-if="webinars.GET_FOUNDWEBINAR" class="course">
    <div class="course__title" @click="searchLesson()">
      {{ webinars.GET_FOUNDWEBINAR.attributes.title }}
    </div>
    <div class="course__theme">
      {{ lesson.lessonName }}
    </div>
    <div v-if="webinars.GET_FOUNDWEBINAR.attributes.lector.data" class="course__lector-title">
      Лектор урока
    </div>
    <div v-if="webinars.GET_FOUNDWEBINAR.attributes.lector.data" class="course__lector-block">
      <div class="course__lector-info">
        <img class="course__lector-photo" src="/src/assets/images/avatar.jpg"/>
        <div class="course__lector-name">
          {{ webinars.GET_FOUNDWEBINAR.attributes.lector.data.attributes.name }}
        </div>
        <a class="course__lector-mail" :href="'mailto:@' + webinars.GET_FOUNDWEBINAR.attributes.lector.data.attributes.mail">
          {{ webinars.GET_FOUNDWEBINAR.attributes.lector.data.attributes.mail }}
        </a>
      </div>
      <ul class="course__lector-benefits">
        <li 
          v-for="(item) in webinars.GET_FOUNDWEBINAR.attributes.lector.data.attributes.qualification"
          :key="item.id"
          class="course__lector-benefit"
        >
          {{ item.item }}
        </li>
      </ul>
    </div>
    <div class="course__content" v-html="lesson.lessonContent" />
    <video
      v-if="lesson.video"
      controls
      class="course__video"
      :src="link + lesson.video.data.attributes.url"
    >
    </video>
    <div class="course__button">
      <spiral-button text="Назад" url="/courses" />
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWebinarsStore } from '@/stores/webinars'
import File from '@/components/elements/File.vue'
import SpiralButton from '@/components/ui/SpiralButton.vue'
export default {
  components: {
    File,
    SpiralButton
  },
  setup () {
    const webinars = useWebinarsStore()
    const route = useRoute()
    const router = useRouter()
    const link = import.meta.env.VITE_UPLOADS_LINK
    const lesson = ref('')

    onMounted(() => {
      Promise.allSettled([
        webinars.fetchWebinars()
      ]).then(() => {
        webinars.searchWebinar(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length)))
      }).then(() => {
        if (!router.currentRoute.value.hash) {
          let tempHash = '#' + webinars.GET_FOUNDWEBINAR.attributes.blocks[0].id + '-' + webinars.GET_FOUNDWEBINAR.attributes.blocks[0].lessons[0].id
          router.replace({ hash: tempHash })
        }
        if (lesson.value.length === 0) {
          const tempBlock = webinars.GET_FOUNDWEBINAR.attributes.blocks.find(item => item.id === Number(webinars.GET_FOUNDWEBINAR.attributes.blocks[0].id))
          lesson.value = tempBlock.lessons.find(item => item.id === Number(webinars.GET_FOUNDWEBINAR.attributes.blocks[0].lessons[0].id))
        }
      })
    })

    function searchLesson() {
      const hashParams = route.hash.slice(1, route.hash.length).split('-')
      const tempBlock = webinars.GET_FOUNDWEBINAR.attributes.blocks.find(item => item.id === Number(hashParams[0]))
      lesson.value = tempBlock.lessons.find(item => item.id === Number(hashParams[1]))
    }

    return {
      webinars,
      lesson,
      link,
      searchLesson
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
  &__file {
    margin-bottom: 102px;
  }
  &__button {
    display: flex;
    justify-content: center;
    margin: 70rem 0 50rem 0;

  }
}
</style>