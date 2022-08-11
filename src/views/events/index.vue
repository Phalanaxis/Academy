<template>
  <div class="events">
    <h2 class="events__title">Мероприятия</h2>
    <events-list :list="events.GET_EVENTS" />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useEventsStore } from '@/stores/events'
import EventsList from '@/components/blocks/EventsList.vue'
export default {
  setup () {
    const events = useEventsStore()
    onMounted(() => {
      events.fetchEvents()
    }) 
    return {
      events
    }
  },
  components: {
    EventsList
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/core.scss';
  .events {
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