import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'system',
  component: RouterView,
  meta: {
    title: '维护'
  },
  children: [
    {
      path: 'file',
      name: 'system-file',
      component: () => import('@/views/system/file/index.vue'),
      meta: {
        title: '附件管理'
      }
    }
  ]
}

export default routes
