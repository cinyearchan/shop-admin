import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from '@/store'
import router from '@/router/'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

let isRefreshing = false

request.interceptors.request.use(config => {
  const user = store.state.user
  if (user && user.token) {
    config.headers = {
      Authorization: `Bearer ${user.token}`
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  const status = response.data.status
  // 正常情况
  if (!status || status === 200) {
    return response
  }
  // token 失效
  if (status === 410000) {
    if (isRefreshing) return Promise.reject(response)
    isRefreshing = true
    ElMessageBox.confirm('您的登录已过期，您可以取消停留在此页面，或确认重新登录', '登录过期', {
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(() => {
      store.commit('setUser', null)

      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
    }).finally(() => {
      isRefreshing = false
    })
    return Promise.reject(response)
  }
  // 其他错误
  ElMessage.error(response.data.msg || '请求失败，请稍后重试')
  return Promise.reject(response)
}, error => {
  return Promise.reject(error)
})

export default async <T = any>(config: AxiosRequestConfig) => {
  const res = await request(config)
  return (res.data.data || res.data) as T
}
