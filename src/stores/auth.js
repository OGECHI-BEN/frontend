import { defineStore } from 'pinia'
import { authService } from '@/services/api'
import axios from 'axios'

const apiClient = axios.create({
  // baseURL: '/api', // Base URL from environment variable
  baseURL: import.meta.env.VITE_APP_API_ENDPOINT,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    userPoints: 0,
    userAvatar: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await apiClient.post('/api/auth/login', credentials)
        // const response = await authService.login(credentials)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', response.data.token)
        return response
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },

    async register(userData) {
      try {
        // console.log('dddddddddddddddddddddddd', userData)
        const response = await apiClient.post('/api/auth/register', userData)
        // const response = await axios.post('/api/auth/register', userData)
        const { token, user } = response.data

        this.token = token
        this.user = user
        this.userPoints = user.points || 0
        this.userAvatar = user.avatar_url // Changed from user.avatar to user.avatar_url

        // Store token in localStorage
        localStorage.setItem('token', token)

        // Set default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        return true
      } catch (error) {
        console.error('Registration error:', error)
        throw error
      }
    },

    async logout() {
      try {
        await authService.logout()
        this.clearAuth()
      } catch (error) {
        console.error('Logout error:', error)
        this.clearAuth() // Clear auth state even if server request fails
      }
    },

    async fetchUser() {
      try {
        const response = await authService.getProfile()
        this.user = response.data
        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj', this.user)
        this.userPoints = response.data.points || 0
        this.userAvatar = response.data.avatar
        return response
      } catch (error) {
        console.error('Fetch user error:', error)
        throw error
      }
    },

    clearAuth() {
      this.user = null
      this.token = null
      this.userPoints = 0
      this.userAvatar = null
      localStorage.removeItem('token')
    },

    async initializeAuth() {
      if (this.token) {
        try {
          await this.fetchUser()
        } catch (error) {
          console.error('Initialize auth error:', error)
          this.clearAuth()
        }
      }
    },
  },
})
