import axios from 'axios'

// Set base URL for all requests
axios.defaults.baseURL = 'http://localhost:8000/api'

// Configure default headers and credentials
axios.defaults.withCredentials = true
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Add request interceptor
axios.interceptors.request.use(
  (config) => {
    // Log the request for debugging
    console.log('Making request to:', config.url, config)

    // Don't set Content-Type for FormData requests
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json'
    }

    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

// Add response interceptor
axios.interceptors.response.use(
  (response) => {
    console.log('Response received:', response)
    return response
  },
  (error) => {
    console.error('Response error:', error)
    if (error.response?.status === 401) {
      // Clear auth state and redirect to login
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default axios
