import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import media from './modules/media'
import order from './modules/order'
import permission from './modules/permission'
import product from './modules/product'
import 'nprogress/nprogress.css'
import nProgress from 'nprogress'
import { store } from '@/store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      product,
      media,
      order,
      permission
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((from, to) => {
  nProgress.start()
  if (to.meta.requiresAuth && !store.state.user) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

router.afterEach(() => {
  nProgress.done()
})

export default router
