<template>
  test
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/profile'

const profile = useProfileStore()
const route = useRoute()

onMounted(() => {
  console.log(route.query)
  profile.getVkontakteAuth(route.query)
})
</script>