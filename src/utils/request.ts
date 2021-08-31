import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default async <T = any>(config: AxiosRequestConfig) => {
  const res = await request(config)
  return (res.data.data || res.data) as T
}
