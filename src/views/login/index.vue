<template>
  login
</template>

<script lang="ts">
import { getLoginInfo } from '@/api/common'
import type { ILoginInfo } from '@/api/types/common'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'Login',
  setup () {
    const list = ref<ILoginInfo['slide']>([])

    onMounted(() => {
      getLoginInfo().then(data => {
        list.value = data.slide
      })
    })

    return {
      list
    }
  }
})
</script>

<style lang="scss" scoped></style>
