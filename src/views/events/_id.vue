<template>
  <div v-if="storeEvents.GET_FOUNDEVENT.attributes" class="event">
    <div class="event__preview">
      <div class="event__info-box">
        <h3 class="event__title" v-html="storeEvents.GET_FOUNDEVENT.attributes.title" />
        <div class="event__location-container">
          <div class="event__location-box">
            <div class="event__sub-title">Место проведения</div>
            <div class="event__location-original" v-html="storeEvents.GET_FOUNDEVENT.attributes.location" />
          </div>
        </div>
        <div class="event__data-container">
            <div class="event__sub-title">Дата и время</div>
            <div class="event__data-box">
              <div class="event__data-original" v-html="formDate(storeEvents.GET_FOUNDEVENT.attributes.date)" />
          </div>
        </div>
      </div>
      <img v-if = "storeEvents.GET_FOUNDEVENT.attributes.image.data" class="event__image" :src="link + storeEvents.GET_FOUNDEVENT.attributes.image.data.attributes.url" />
    </div>
    <div class="event__description" v-html="storeEvents.GET_FOUNDEVENT.attributes.description" />
    <div class="event__button-link-container">
      <spiral-button class="event__button" text="Все мероприятия" url="/events" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEventsStore } from '@/stores/events'
import SpiralButton from '@/components/ui/SpiralButton.vue'
export default {
  components: {
    SpiralButton
  },
  setup () {
    const storeEvents = useEventsStore()
    const route = useRoute()
    const buttonPlaceholder = ref('В корзину')
    const disabled = ref(false)
    const link = import.meta.env.VITE_UPLOADS_LINK
    function formDate (date) {
      let newDate = new Date(date)
      let hours = (newDate.getHours() < 10) ? '0' + newDate.getHours() : newDate.getHours()
      let minutes = (newDate.getMinutes() < 10) ? '0' + newDate.getMinutes() : newDate.getMinutes()
      return newDate.getDate() + '.' + (newDate.getMonth() + 1) + '.' + newDate.getFullYear() + ' ' + hours + ':' + minutes
    }
    onMounted (() => {
      storeEvents.fetchEvents().then((result) => {
        if (result === true) {
          storeEvents.searchEvent(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length)))
        }
      })
    })
    return {
      storeEvents,
      buttonPlaceholder,
      disabled,
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
    padding: 190px 20% 140rem 110rem;
    &__preview {
      display: flex;
      border: 1px #C5B1B2 solid;
      border-radius: 15px;
      min-height: 300rem;
    }
    &__image {
      width: calc(100% - 360rem);
      object-fit: cover;
      border-radius: 0 15px 15px 0;
    }
    &__info-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 360rem;
      margin: 30rem 20rem 30rem 30rem;

    }
    &__title {
      font-weight: 600;
      font-size: 16rem;
      line-height: 30rem;
      color: #644C5C;
      margin: 0;
    }
    &__cost-box {
      margin: 0 0 30rem 0;
    }
    &__location-container {
      margin-top: auto;
      padding-top: 25rem;
    }
    &__sub-title {
      font-weight: 600;
      font-size: 16rem;
      color: #644C5C;
      line-height: 150%;
      margin-bottom: 5rem;
    }
    &__location-original {
      font-weight: 400;
      font-size: 14rem;
      line-height: 150%;
      margin-bottom: 25rem;
      color: #644C5C;
    }
    &__data-box {
      display: flex;
      font-size: 14rem;
    }
    &__data-original {
      color: #644C5C;
      word-spacing: 25rem;
    }
    &__cost-original {
      font-weight: 600;
      font-size: 24rem;
      line-height: 36rem;
      color: #644C5C;
    }
    &__description {
      margin: 40rem 0 0 0;
      font-size: 14rem;
    }
    &__button-link-container {
      display: flex;
      justify-content: center;
      margin: 100rem 0 0 0;
    }
  }
</style>