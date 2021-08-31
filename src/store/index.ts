import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { IUserInfo } from '@/api/types/common'
import { setItem, getItem } from '@/utils/storage'
import { USER } from '@/utils/constants'

export interface State {
  count: number
  isCollapse: boolean,
  user: IUserInfo | null
}

export const key: InjectionKey<Store<State>> = Symbol('store')

export const store = createStore<State>({
  state () {
    return {
      count: 0,
      isCollapse: false,
      user: getItem<IUserInfo>(USER)
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setIsCollapse (state, payload: boolean) {
      state.isCollapse = payload
    },
    setUser (state, payload) {
      state.user = payload
      setItem(USER, state.user)
    }
  }
})

export function useStore () {
  return baseUseStore(key)
}
