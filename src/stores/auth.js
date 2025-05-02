import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userAvatar: (state) => state.user?.avatar || '/avatars/default.png',
    userPoints: (state) => state.user?.points || 0,
  },

  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('/api/auth/login', credentials)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token)
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed'
        return false
      } finally {
        this.loading = false
      }
    },

    async register(userData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('/api/auth/register', userData)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token)
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Registration failed'
        return false
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      try {
        await axios.post('/api/auth/logout')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.token = null
        this.user = null
        localStorage.removeItem('token')
        this.loading = false
      }
    },

    async fetchUser() {
      if (!this.token) return

      this.loading = true
      try {
        const response = await axios.get('/api/user/profile')
        this.user = response.data
      } catch (error) {
        console.error('Fetch user error:', error)
        this.token = null
        this.user = null
        localStorage.removeItem('token')
      } finally {
        this.loading = false
      }
    },

    async updateProfile(userData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.put('/api/user/profile', userData)
        this.user = response.data
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Profile update failed'
        return false
      } finally {
        this.loading = false
      }
    },
  },
})
