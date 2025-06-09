import { defineStore } from 'pinia'
import api from '@/services/api' // Correctly import your configured 'api' instance

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
        const response = await api.get(`/content/${language}/${level}`)
        // When fetching lessons for the list view, you might also need to parse their content/options if displayed
        // For simplicity, we'll focus on fetchLesson first, but keep this in mind.
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
        const response = await api.get(`/content/${language}/${level}/${lessonSlug}`)
        let lessonData = response.data.data // Access the 'data' property as your API response wraps it

        // --- IMPORTANT: Parse the 'content' field from JSON string to object ---
        if (lessonData && typeof lessonData.content === 'string') {
          try {
            lessonData.content = JSON.parse(lessonData.content)
          } catch (e) {
            console.error('Error parsing lesson content JSON:', e)
            this.error = 'Failed to parse lesson content.'
            // Do not return here, set content to a default so template doesn't crash
            lessonData.content = { sections: [], exercise: {}, navigation: {} }
          }
        } else if (!lessonData.content) {
          // Ensure content is at least an object to avoid errors
          lessonData.content = { sections: [], exercise: {}, navigation: {} }
        }

        // --- IMPORTANT: Parse 'options' for each question from JSON string to array ---
        if (lessonData.questions && Array.isArray(lessonData.questions)) {
          lessonData.questions = lessonData.questions.map((question) => {
            if (typeof question.options === 'string') {
              try {
                question.options = JSON.parse(question.options)
              } catch (e) {
                console.error('Error parsing question options JSON:', e)
                question.options = [] // Default to empty array on parse error
              }
            }
            return question
          })
        }
        // --- End of parsing logic for questions ---

        this.currentLesson = lessonData // Assign the potentially modified lessonData
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
        const response = await api.post(`/content/${language}/${level}/${lessonSlug}/complete`)
        this.progress = response.data.progress
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
        const response = await api.post(`/content/exercises/${exerciseId}/submit`, { answer })
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
        const response = await api.get(`/quiz/${language}/${level}/${lessonSlug}`)
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
        const response = await api.post('/quiz/submit', {
          language_id: this.currentLesson.language.id,
          level_id: this.currentLesson.level.id,
          lesson_id: this.currentLesson.id,
          answers,
          time_taken: 0,
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
