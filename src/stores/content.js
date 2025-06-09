import { defineStore } from 'pinia'
import axios from 'axios'

export const useContentStore = defineStore('content', {
  state: () => ({
    currentLanguage: null,
    currentLevel: null,
    currentLesson: null,
    lessons: [],
    exercises: [],
    quiz: null,
    loading: false,
    error: null,
    progress: 0,
  }),

  getters: {
    isLessonCompleted: (state) => (lessonId) => {
      return state.lessons.find((lesson) => lesson.id === lessonId)?.completed || false
    },

    currentLessonContent: (state) => {
      return state.currentLesson?.content || ''
    },

    currentLessonExercises: (state) => {
      return state.currentLesson?.exercises || []
    },

    currentLessonQuiz: (state) => {
      return state.currentLesson?.questions || []
    },
  },

  actions: {
    async fetchLessons(language, level) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`/api/content/${language}/${level}`)
        this.lessons = response.data
        this.currentLanguage = language
        this.currentLevel = level
      } catch (error) {
        console.error('Error fetching lessons:', error)
        this.error = error.response?.data?.message || 'Failed to fetch lessons'
      } finally {
        this.loading = false
      }
    },

    async fetchLesson(language, level, lessonSlug) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`/api/content/${language}/${level}/${lessonSlug}`)
        this.currentLesson = response.data
      } catch (error) {
        console.error('Error fetching lesson:', error)
        this.error = error.response?.data?.message || 'Failed to fetch lesson'
      } finally {
        this.loading = false
      }
    },

    async completeLesson(language, level, lessonSlug) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(
          `/api/content/${language}/${level}/${lessonSlug}/complete`,
        )
        this.progress = response.data.progress
        // Update the lesson's completed status in the lessons array
        const lessonIndex = this.lessons.findIndex((lesson) => lesson.slug === lessonSlug)
        if (lessonIndex !== -1) {
          this.lessons[lessonIndex].completed = true
        }
      } catch (error) {
        console.error('Error completing lesson:', error)
        this.error = error.response?.data?.message || 'Failed to complete lesson'
      } finally {
        this.loading = false
      }
    },

    async submitExercise(exerciseId, answer) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(`/api/content/exercises/${exerciseId}/submit`, { answer })
        return response.data
      } catch (error) {
        console.error('Error submitting exercise:', error)
        this.error = error.response?.data?.message || 'Failed to submit exercise'
        throw error
      } finally {
        this.loading = false
      }
    },

    async startQuiz(language, level, lessonSlug) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`/api/quiz/${language}/${level}/${lessonSlug}`)
        this.quiz = response.data
      } catch (error) {
        console.error('Error starting quiz:', error)
        this.error = error.response?.data?.message || 'Failed to start quiz'
      } finally {
        this.loading = false
      }
    },

    async submitQuiz(answers) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('/api/quiz/submit', {
          language_id: this.currentLesson.language.id,
          level_id: this.currentLesson.level.id,
          lesson_id: this.currentLesson.id,
          answers,
          time_taken: 0, // You might want to track this
        })
        return response.data
      } catch (error) {
        console.error('Error submitting quiz:', error)
        this.error = error.response?.data?.message || 'Failed to submit quiz'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
