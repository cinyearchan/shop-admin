import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import { store, key } from './store'
import ElementPlus from '@/plugins/element-plus'
import VXETable from 'vxe-table'

import '@/styles/index.scss'

// console.log(import.meta.env.BASE_URL)

const app = createApp(App)

app.use(router).use(store, key).use(ElementPlus).use(VXETable)

/**
 * 自动注册全局组件
 */
const modules = import.meta.globEager('./components/**/index.ts')
for (const path in modules) {
  app.use(modules[path].default)
}

app.mount('#app')
