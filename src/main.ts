import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'

import '@/styles/index.scss'

console.log(import.meta.env.BASE_URL)

createApp(App)
  .use(router)
  .use(store, key)
  .mount('#app')
