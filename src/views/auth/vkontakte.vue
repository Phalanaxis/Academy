<template>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/profile'

const profile = useProfileStore()
const route = useRoute()

onMounted(() => {
  profile.getVkontakteAuth(route.query)
})
</script>