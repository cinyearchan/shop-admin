import { App } from 'vue'
import Component from './index.vue'

export default {
  install (app: App) {
    app.component('AppIcon', Component)
  }
}
