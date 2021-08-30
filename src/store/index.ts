import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'

export interface State {
  count: number
  isCollapse: boolean
}

export const key: InjectionKey<Store<State>> = Symbol('store')

export const store = createStore<State>({
  state () {
    return {
      count: 0,
      isCollapse: false
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setIsCollapse (state, payload: boolean) {
      state.isCollapse = payload
    }
  }
})

export function useStore () {
  return baseUseStore(key)
}
