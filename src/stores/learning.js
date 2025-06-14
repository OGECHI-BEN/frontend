// In src/stores/learning.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useLearningStore = defineStore('learning', {
  state: () => ({
    languages: [],
    currentLanguage: null,
    currentLesson: null,
    userProgress: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchLanguages() {
      this.loading = true
      try {
        // const response = await axios.get('/api/languages')
        const response = await axios.get('/content/languages')
        this.languages = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchLessonsByLanguage(languageSlug) {
      this.loading = true
      try {
        const response = await axios.get(`/content/languages/${languageSlug}/lessons`)
        return response.data
      } catch (error) {
        this.error = error.message
        return []
      } finally {
        this.loading = false
      }
    },

    async fetchLesson(languageSlug, lessonSlug) {
      this.loading = true
      try {
        const response = await axios.get(`/api/languages/${languageSlug}/lessons/${lessonSlug}`)
        this.currentLesson = response.data.lesson
        return response.data
      } catch (error) {
        this.error = error.message
        return null
      } finally {
        this.loading = false
      }
    },

    async submitAnswer(lessonId, questionId, answer) {
      try {
        const response = await axios.post(`/api/lessons/${lessonId}/questions/${questionId}`, {
          answer,
        })
        return response.data
      } catch (error) {
        this.error = error.message
        return null
      }
    },

    async submitExercise(lessonId, exerciseId, code) {
      try {
        const response = await axios.post(`/api/lessons/${lessonId}/exercises/${exerciseId}`, {
          code,
        })
        return response.data
      } catch (error) {
        this.error = error.message
        return null
      }
    },

    async fetchProgress() {
      try {
        const response = await axios.get('/api/progress')
        this.userProgress = response.data.progress
        return response.data
      } catch (error) {
        this.error = error.message
        return null
      }
    },
  },
})
