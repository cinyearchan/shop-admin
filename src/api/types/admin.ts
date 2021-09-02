export interface IListParams {
  page: number
  limit: number
  name: string
  roles?: string
  status?: '' | 0 | 1
}

export interface IAdmin {
  id: number
  account: string
  head_pic: string
  pwd: string
  real_name: string
  roles: string
  last_ip: string
  last_time: number
  add_time: number
  login_count: number
  level: number
  status: number // 0 | 1
  is_del: number // 0 | 1
  _add_time: string
  _last_time: string
  statusLoading?: boolean
}

export interface IListResponse {
  list: IAdmin[]
  count: number
}

export interface IAdminData {
  account: string
  conf_pwd: string
  pwd: string
  roles: string
  status: number
  real_name: string
}

export interface IAdminInfo {
  real_name: string
  head_pic: string
  pwd?: string
  new_pwd?: string
  conf_pwd?: string
}

export interface IAdminOptions {
  label: string
  value: number
  title?: string
  action?: string
  method?: string
  info?: string
  status?: boolean
}

export interface IValidateInfo {
  message: string
  required: boolean
  type: string
  trigger: string
  options: IAdminOptions[]
}

export interface IAdminForm {
  rules: object[]
  type: string
  field: string
  value: number[] | number
  title: string
  props: {
    type?: string
    placeholder?: string
    multiple?: boolean
    validate: IValidateInfo[]
  }
}

export interface ICurrentAdmin {
  id?: number
  account?: string
  head_pic?: string
  real_name?: string
  roles?: string[]
  last_ip?: string
  last_time?: number
  add_time?: number
  login_count?: number
  level?: number
}
