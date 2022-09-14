<template>
  <section class="events">
    <ui-title>Мероприятия</ui-title>
    <events-list :list="events.GET_EVENTS" />
  </section>
</template>

<script>
import { onMounted } from 'vue'
import { useEventsStore } from '@/stores/events'
import EventsList from '@/components/blocks/EventsList.vue'
import UiTitle from '@/components/ui/UiTitle.vue'
export default {
  components: {
    EventsList,
    UiTitle
  },
  setup () {
    const events = useEventsStore()
    onMounted(() => {
      events.fetchEvents()
    }) 
    return {
      events
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/core.scss';
  .events {
    width: 100%;
  }
</style>