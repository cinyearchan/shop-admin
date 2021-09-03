import request from '@/utils/request'
import { IFormData } from './types/form'
import { Menu } from './types/menu'

export const getMenus = (params: {
  is_show: 0 | 1 | ''
  keyword: string
}) => {
  return request<Menu[]>({
    method: 'GET',
    url: '/setting/menus',
    params
  })
}

export const createMenu = (data: {
  path: number[]
} & Omit<Menu, 'id' | 'children' | 'is_del' | 'path'>) => {
  return request({
    method: 'POST',
    url: '/setting/menus',
    data
  })
}

export const getMenuTree = () => {
  return request<IFormData>({
    method: 'GET',
    url: '/setting/menus/create'
  }).then(data => {
    const findData = data.rules.find(item => item.field === 'menu_list')
    return (findData && findData.props && findData.props.data) || []
  })
}

export const updateMenu = (id: number, data: { path: number[] } & Omit<Menu, 'id' | 'children' | 'is_del' | 'path'>) => {
  return request({
    method: 'PUT',
    url: `/setting/menus/${id}`,
    data
  })
}

export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/setting/menus/${id}`
  })
}

export const getMenu = (id: number) => {
  return request<{
    path: number[]
  } & Omit<Menu, 'path'>>({
    method: 'GET',
    url: `/setting/menus/${id}`
  })
}

export const updateMenuStatus = (id: number, isShow: 0 | 1) => {
  return request({
    method: 'PUT',
    url: `/setting/menus/show/${id}`,
    data: {
      is_show: isShow
    }
  })
}
