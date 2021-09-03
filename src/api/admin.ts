import request from '@/utils/request'
import { IAdminData, IAdminInfo, IListParams, IListResponse } from './types/admin'
import { IFormData } from './types/form'

/**
 * 管理员列表
 * @param params IListParams
 * @returns IListResponse
 */
export const getAdmins = (params: IListParams) => {
  return request<IListResponse>({
    method: 'GET',
    url: '/setting/admin',
    params
  })
}

/**
 * 添加管理员
 * @param data IAdminData
 * @returns null
 */
export const createAdmin = (data: IAdminData) => {
  return request<null>({
    method: 'POST',
    url: '/setting/admin',
    data
  })
}

/**
 * 修改管理员信息
 * @param id number
 * @param data IAdminData
 * @returns null
 */
export const updateAdmin = (id: number, data: IAdminData) => {
  return request<null>({
    method: 'PUT',
    url: `/setting/admin/${id}`,
    data
  })
}

/**
 * 删除管理员
 * @param id number
 * @returns null
 */
export const deleteAdmin = (id: number) => {
  return request<null>({
    method: 'DELETE',
    url: `/setting/admin/${id}`
  })
}

/**
 * 修改状态
 * @param id number
 * @param status 0 | 1
 * @returns null
 */
export const updateAdminStatus = (id: number, status: 0 | 1) => {
  return request<null>({
    method: 'PUT',
    url: `/setting/set_status/${id}/${status}`
  })
}

/**
 * 修改当前管理员信息
 * @param data IAdminInfo
 */
export const updateCurrentAdmin = (data: IAdminInfo) => {
  return request<null>({
    method: 'PUT',
    url: '/setting/update_admin',
    data
  })
}

/**
 * 管理员添加表单
 */
// export const createAdminForm = () => {
//   return request<IAdminData>({
//     method: 'GET',
//     url: '/setting/admin/create'
//   })
// }

/**
 * 获取修改管理员表单
 * @param id number
 * @returns IAdminForm
 */
export const getAdmin = (id: number) => {
  return request<IFormData>({
    method: 'GET',
    url: `/setting/admin/${id}/edit`
  }).then(data => {
    const obj: Record<string, any> = {}
    data.rules.forEach(item => {
      obj[item.field] = item.value
    })
    return obj as {
      account: string
      pwd: string
      conf_pwd: string
      real_name: string
      roles: string[]
      status: 0 | 1
    }
  })
}

/**
 * 获取当前登录管理员信息
 * @returns ICurrentAdmin
 */
export const getCurrentAdmin = () => {
  return request({
    method: 'GET',
    url: '/setting/info'
  })
}

export const getRoles = () => {
  return request<IFormData>({
    method: 'GET',
    url: '/setting/admin/create'
  }).then(data => {
    const roles = data.rules.find(item => item.field === 'roles')
    if (roles && roles.options) {
      return roles.options
    }
    return []
  })
}
