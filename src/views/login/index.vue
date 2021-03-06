<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :rules="rules"
      ref="form"
      :model="user"
      size="medium"
      @submit.prevent="handleSubmit"
    >
      <div class="login-form__header">
        登录
      </div>
      <el-form-item prop="account">
        <el-input
          v-model="user.account"
          placeholder="请输入用户名"
        >
          <template #prefix>
            <i class="el-input__icon el-icon-user" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          v-model="user.pwd"
          placeholder="请输入密码"
        >
          <template #prefix>
            <i class="el-input__icon el-icon-lock" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="imgcode">
        <div class="imgcode-wrap">
          <el-input
            v-model="user.imgcode"
            placeholder="请输入验证码"
          >
            <template #prefix>
              <i class="el-input__icon el-icon-key" />
            </template>
          </el-input>
          <img
            :src="captchaSrc"
            alt="验证码"
            class="imgcode"
            @click="loadCaptcha"
          >
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          :loading="loading"
          native-type="submit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
// import { getLoginInfo } from '@/api/common'
// import type { ILoginInfo } from '@/api/types/common'
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { getCaptcha, login } from '@/api/common'
import { IElForm, IFormRule } from '@/types/element-plus'
import { ILoginData } from '@/api/types/common'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Login',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const user = reactive<ILoginData>({
      account: 'admin',
      pwd: '123456',
      imgcode: ''
    })

    const form = ref<IElForm | null>(null)

    const loading = ref(false)

    const rules = ref<IFormRule>({
      account: [
        { required: true, message: '请输入账号', trigger: 'change' }
      ],
      pwd: [
        { required: true, message: '请输入密码', trigger: 'change' }
      ],
      imgcode: [
        { required: true, message: '请输入验证码', trigger: 'change' }
      ]
    })

    const captchaSrc = ref('')

    const handleSubmit = async () => {
      const valid = await form.value?.validate()
      if (!valid) {
        return false
      }
      loading.value = true
      try {
        const data = await login(user)
        store.commit('setUser', {
          ...data.user_info,
          token: data.token
        })
        // router.replace({
        //   name: 'home'
        // })

        let redirect = route.query.redirect || '/'
        if (typeof redirect !== 'string') {
          redirect = '/'
        }
        router.replace(redirect)
      } catch (e) {
        loadCaptcha()
      } finally {
        loading.value = false
      }
    }

    const loadCaptcha = async () => {
      const data = await getCaptcha()
      captchaSrc.value = URL.createObjectURL(data)
    }

    onMounted(() => {
      loadCaptcha()
    })

    return {
      user,
      form,
      loading,
      rules,
      handleSubmit,
      captchaSrc,
      loadCaptcha
    }
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  min-width: 400px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3d3a4b;
}
.login-form {
  padding: 30px;
  border-radius: 6px;
  background: #fff;
  min-width: 350px;
  .login-form__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
  }
  .el-form-item:last-child {
    margin-bottom: 0;
  }
  .login__form-title {
    display: flex;
    justify-content: center;
    color: #fff;
  }
  .submit-button {
    width: 100%;
  }
  .login-logo {
    width: 271px;
    height: 74px;
  }
  .imgcode-wrap {
    display: flex;
    align-items: center;
    .imgcode {
      height: 37px;
    }
  }
}
</style>
