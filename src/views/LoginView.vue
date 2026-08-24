<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const form = reactive({
  username: '',
  password: '',
})

async function handleSubmit() {
  const ok = await authStore.login(form)
  if (ok) {
    router.push(route.query.redirect || { name: 'dashboard' })
  }
}
</script>

<template>
  <div class="login-view">
    <div class="login-header">
      <span class="brand-mark">AE</span>
      <h1>เข้าสู่ระบบ</h1>
      <p>กรอกบัญชีผู้ใช้เพื่อเข้าใช้งาน Admin Console</p>
    </div>

    <form class="login-form" @submit.prevent="handleSubmit">
      <BaseInput
        v-model="form.username"
        label="ชื่อผู้ใช้"
        placeholder="username"
      />
      <BaseInput
        v-model="form.password"
        label="รหัสผ่าน"
        type="password"
        placeholder="••••••••"
      />

      <p v-if="authStore.error" class="form-error">{{ authStore.error }}</p>

      <BaseButton type="submit" :loading="authStore.loading" style="width: 100%; margin-top: 4px">
        เข้าสู่ระบบ
      </BaseButton>
    </form>
  </div>
</template>

<style scoped>
.login-header {
  text-align: center;
  margin-bottom: 28px;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--color-ink);
  color: #ffffff;
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 16px;
}

.login-header h1 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 6px;
  color: var(--color-ink);
}

.login-header p {
  font-size: 13.5px;
  color: var(--color-muted);
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-error {
  margin: 0;
  padding: 10px 12px;
  background: var(--color-danger-soft);
  color: var(--color-danger);
  border-radius: var(--radius-sm);
  font-size: 13px;
}
</style>
