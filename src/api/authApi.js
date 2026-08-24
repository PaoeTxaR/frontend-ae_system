import axiosInstance from '@/api/axiosInstance'

export const authApi = {
  login(credentials) {
    // credentials: { username, password }
    // returns: { accessToken, tokenType, expiresIn }
    return axiosInstance.post('/auth/login', credentials)
  },

  register(payload) {
    // payload: { username, email, password }
    return axiosInstance.post('/auth/register', payload)
  },

  logout() {
    return axiosInstance.post('/auth/logout')
  },
}
