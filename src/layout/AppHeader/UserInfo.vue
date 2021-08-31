<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ $store.state.user?.account }}
      <i class="el-icon-arrow-down el-icon--right" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item
          @click="handleLogout"
        >
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { logout } from '@/api/common'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserInfo',
  setup () {
    const router = useRouter()
    const store = useStore()

    const handleLogout = () => {
      ElMessageBox.confirm('确认退出吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await logout()

        store.commit('setUser', null)

        ElMessage.success('退出成功')

        router.push({
          name: 'login'
        })
      }).catch(() => {
        ElMessage.info('已取消退出')
      })
    }

    return {
      handleLogout
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
