import { defineStore } from 'pinia'
import { userApi } from '@/api/userApi'

export const useUserStore = defineStore('users', {
  state: () => ({
    list: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        const { data } = await userApi.getAllUsers()
        this.list = data
      } catch (err) {
        this.error = err.response?.data?.message || 'โหลดรายชื่อผู้ใช้ไม่สำเร็จ'
      } finally {
        this.loading = false
      }
    },

    async create(payload) {
      try {
        const { data } = await userApi.createUser(payload)
        this.list.push(data)
        return data
      } catch (err) {
        this.error = err.response?.data?.message || 'สร้างผู้ใช้ไม่สำเร็จ'
        throw err
      }
    },

    async update(id, payload) {
      try {
        const { data } = await userApi.updateUser(id, payload)
        const index = this.list.findIndex((user) => user.id === id)
        if (index !== -1) this.list[index] = data
        return data
      } catch (err) {
        this.error = err.response?.data?.message || 'แก้ไขผู้ใช้ไม่สำเร็จ'
        throw err
      }
    },

    async remove(id) {
      try {
        await userApi.deleteUser(id)
        this.list = this.list.filter((user) => user.id !== id)
      } catch (err) {
        this.error = err.response?.data?.message || 'ลบผู้ใช้ไม่สำเร็จ'
        throw err
      }
    },
  },
})
