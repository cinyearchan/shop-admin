<template>
  home
  <p>{{ store.state.count }}</p>
  <p>{{ $store.state.count }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Home',
  setup () {
    const store = useStore()
    console.log('store', store)
    return {
      store
    }
  }
})
</script>

<style lang="scss" scoped></style>
