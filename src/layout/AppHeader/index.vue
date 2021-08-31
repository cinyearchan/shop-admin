<template>
  <el-space size="large">
    <ToggleSidebar />
    <Breadcrumb />
  </el-space>
  <el-space size="large">
    <MenuSearch />
    <FullScreen />
    <Notification />
    <UserInfo />
  </el-space>
</template>

<script lang="ts" setup>
import Breadcrumb from './Breadcrumb.vue'
import FullScreen from './FullScreen.vue'
import MenuSearch from './MenuSearch.vue'
import Notification from './Notification.vue'
import ToggleSidebar from './ToggleSidebar.vue'
import UserInfo from './UserInfo.vue'
</script>

<style lang="scss" scoped>
i {
  font-size: 19px;
  cursor: pointer;
}
</style>
