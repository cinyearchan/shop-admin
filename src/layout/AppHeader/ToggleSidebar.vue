<template>
  <i
    :class="$store.state.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
    @click="$store.commit('setIsCollapse', !$store.state.isCollapse)"
  />
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
</style>
