import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const userLevels = computed(() => ({
    html: user.value?.html_level || 'beginner',
    css: user.value?.css_level || 'beginner',
    python: user.value?.python_level || 'beginner',
  }))
  const totalPoints = computed(() => user.value?.total_points || 0)

  // Actions
  const setToken = (newToken) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  const setUser = (userData) => {
    user.value = userData
  }

  const login = async (credentials) => {
    loading.value = true
    error.value = null
    try {
      // TODO: Implement actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      setToken(data.token)
      setUser(data.user)
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    error.value = null
    try {
      // TODO: Implement actual API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data = await response.json()
      setToken(data.token)
      setUser(data.user)
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  const updateUserProgress = async (language, level, points) => {
    if (!user.value) return

    try {
      // TODO: Implement actual API call
      const response = await fetch('/api/user/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          language,
          level,
          points,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update progress')
      }

      const data = await response.json()
      setUser(data.user)
    } catch (err) {
      error.value = err.message
    }
  }

  return {
    // State
    user,
    token,
    loading,
    error,

    // Getters
    isAuthenticated,
    isAdmin,
    userLevels,
    totalPoints,

    // Actions
    login,
    register,
    logout,
    updateUserProgress,
  }
})
