/**
 * 公共基础接口封装
 */
import request from '@/utils/request'
import { ILoginData, ILoginInfo, ILoginResponse } from './types/common'

// interface ResponseData<T = any> {
//   status: number
//   msg: string
//   data: T
// }

export const getLoginInfo = () => {
  // return request({
  //   method: 'GET',
  //   url: '/login/info'
  // })

  // return request.get<ResponseData<{
  //   logo_square: string,
  //   logo_rectangle: string,
  //   login_logo: string,
  //   slide: string[]
  // }>>('/login/info')

  return request<ILoginInfo>({
    method: 'GET',
    url: '/login/info'
  })
}

export const getCaptcha = () => {
  return request<Blob>({
    method: 'GET',
    url: '/captcha_pro',
    params: {
      stamp: Date.now()
    },
    responseType: 'blob'
  })
}

export const login = (data: ILoginData) => {
  return request<ILoginResponse>({
    method: 'POST',
    url: '/login',
    data
  })
}

export const logout = () => {
  return request({
    method: 'GET',
    url: '/setting/admin/logout'
  })
}
