import axiosInstance from '@/api/axiosInstance'

export const userApi = {
  getMe() {
    return axiosInstance.get('/users/')
  },

  getUserById(id) {
    return axiosInstance.get(`/users/${id}`)
  },

  getAllUsers() {
    return axiosInstance.get('/users/find-all')
  },

  createUser(payload) {
    return axiosInstance.post('/auth/register', payload)
  },

  updateUser(id, payload) {
    return axiosInstance.put(`/users/${id}`, payload)
  },

  deleteUser(id) {
    return axiosInstance.delete(`/users/${id}`)
  },
}
