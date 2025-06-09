import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_ENDPOINT + '/api', //
  // baseURL: 'http://localhost:8000/api',//
  headers: {
    Accept: 'application/json',
  },
  withCredentials: false,
  timeout: 10000,
})

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Don't set Content-Type for FormData - let axios handle it automatically
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json'
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message)

    if (error.response?.status === 401) {
      // Clear auth state and redirect to login
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export const lessonService = {
  // Get all lessons for a language and level
  getLessons: (language, level) => {
    return api.get(`/content/${language}/${level}`)
  },

  // Get a specific lesson
  getLesson: (language, level, lessonSlug) => {
    return api.get(`/content/${language}/${level}/${lessonSlug}`)
  },

  // Mark a lesson as complete
  completeLesson: (language, level, lessonSlug) => {
    return api.post(`/content/${language}/${level}/${lessonSlug}/complete`)
  },

  submitExercise: (language, level, lessonSlug, exerciseId, solution) => {
    return api.post(`/content/${language}/${level}/${lessonSlug}/exercises/${exerciseId}/submit`, {
      solution,
    })
  },

  submitQuiz: (language, level, lessonSlug, answers) => {
    return api.post(`/content/${language}/${level}/${lessonSlug}/quiz/submit`, {
      answers,
    })
  },
}

export const authService = {
  login: (credentials) => {
    return api.post('/auth/login', credentials)
  },

  register: (userData) => {
    // For FormData, axios will automatically set the correct Content-Type header
    // including the boundary parameter needed for multipart/form-data
    return api.post('/auth/register', userData)
  },

  logout: () => {
    return api.post('/auth/logout')
  },

  getProfile: () => {
    return api.get('/auth/user')
  },
}

export default api
