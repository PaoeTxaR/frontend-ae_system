import { defineStore } from 'pinia'
import { authApi } from '@/api/authApi'
import { userApi } from '@/api/userApi'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('accessToken') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const { data } = await authApi.login(credentials)
        this.token = data.accessToken
        localStorage.setItem('accessToken', data.accessToken)

        // Fetch profile right after login so the navbar/UI has a display name immediately
        await this.fetchMe()

        return true
      } catch (err) {
        this.error = err.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ'
        return false
      } finally {
        this.loading = false
      }
    },

    async fetchMe() {
      try {
        const { data } = await userApi.getMe()
        this.user = data
        localStorage.setItem('user', JSON.stringify(data))
      } catch (err) {
        // If this fails, the response interceptor will already handle 401 redirects
        console.error('Failed to fetch current user', err)
      }
    },

    async logout() {
      try {
        await authApi.logout()
      } catch (err) {
        // Even if the backend call fails (e.g. already expired), still clear local state
        console.error('Logout request failed', err)
      } finally {
        this.clearAuth()
      }
    },

    clearAuth() {
      this.token = null
      this.user = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
    },
  },
})
