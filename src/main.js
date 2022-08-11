import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'

const pinia = createPinia()

createApp(App).use(naive).use(pinia).use(router).mount('#app')
