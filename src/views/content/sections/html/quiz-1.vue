<template>
  <div class="quiz-content">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading quiz...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p class="error-message">{{ error }}</p>
      <button @click="fetchQuiz" class="retry-button">Retry</button>
    </div>

    <template v-else>
      <div class="quiz-header">
        <h2>{{ quiz.title }}</h2>
        <div class="quiz-meta">
          <span class="question-count">{{ quiz.questions.length }} Questions</span>
          <span class="time-limit" v-if="quiz.timeLimit">{{ quiz.timeLimit }} minutes</span>
        </div>
      </div>

      <form @submit.prevent="submitQuiz" class="quiz-form">
        <div v-for="(question, index) in quiz.questions" :key="question.id" class="question-card">
          <div class="question-header">
            <span class="question-number">Question {{ index + 1 }}</span>
            <span class="question-points">{{ question.points }} points</span>
          </div>

          <p class="question-text">{{ question.text }}</p>

          <div class="options-list">
            <label
              v-for="option in question.options"
              :key="option.id"
              class="option-item"
              :class="{ selected: userAnswers[question.id] === option.id }"
            >
              <input
                type="radio"
                :name="'question-' + question.id"
                :value="option.id"
                v-model="userAnswers[question.id]"
                class="option-radio"
              />
              <span class="option-text">{{ option.text }}</span>
            </label>
          </div>
        </div>

        <div class="quiz-actions">
          <button type="submit" class="submit-button" :disabled="isSubmitting || !isQuizComplete">
            {{ isSubmitting ? 'Submitting...' : 'Submit Quiz' }}
          </button>
        </div>
      </form>

      <!-- Quiz Results -->
      <div v-if="quizResults" class="quiz-results">
        <h3>Quiz Results</h3>
        <div class="results-summary">
          <div class="score">
            <span class="score-label">Your Score:</span>
            <span class="score-value">{{ quizResults.score }}%</span>
          </div>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-label">Correct Answers:</span>
              <span class="stat-value">{{ quizResults.correctAnswers }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Total Questions:</span>
              <span class="stat-value">{{ quiz.questions.length }}</span>
            </div>
          </div>
        </div>

        <div class="results-actions">
          <button @click="retakeQuiz" class="retake-button">Retake Quiz</button>
          <button @click="continueToNextLesson" class="continue-button">
            Continue to Next Lesson
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { quizService } from '@/services/api'

const route = useRoute()
const router = useRouter()

const quiz = ref(null)
const loading = ref(true)
const error = ref(null)
const userAnswers = ref({})
const isSubmitting = ref(false)
const quizResults = ref(null)

const isQuizComplete = computed(() => {
  if (!quiz.value) return false
  return quiz.value.questions.every((question) => userAnswers.value[question.id])
})

const fetchQuiz = async () => {
  loading.value = true
  error.value = null

  try {
    const { language, level } = route.params
    const response = await quizService.getQuiz(language, level, 'lesson-1')
    quiz.value = response.data
  } catch (err) {
    error.value = 'Failed to load quiz. Please try again.'
    console.error('Error fetching quiz:', err)
  } finally {
    loading.value = false
  }
}

const submitQuiz = async () => {
  if (!isQuizComplete.value) return

  isSubmitting.value = true
  try {
    const response = await quizService.submitQuiz(quiz.value.id, userAnswers.value)
    quizResults.value = response.data
  } catch (err) {
    error.value = 'Failed to submit quiz. Please try again.'
    console.error('Error submitting quiz:', err)
  } finally {
    isSubmitting.value = false
  }
}

const retakeQuiz = () => {
  userAnswers.value = {}
  quizResults.value = null
}

const continueToNextLesson = () => {
  router.push({
    name: 'content',
    params: {
      language: route.params.language,
      level: route.params.level,
    },
    query: {
      section: 'lesson-2',
    },
  })
}

onMounted(fetchQuiz)
</script>

<style scoped>
.quiz-content {
  @apply max-w-4xl mx-auto p-6;
}

.loading-state {
  @apply flex flex-col items-center justify-center min-h-[400px];
}

.spinner {
  @apply w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin mb-4;
}

.error-state {
  @apply text-center py-8;
}

.error-message {
  @apply text-red-600 mb-4;
}

.retry-button {
  @apply px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-dark transition-colors;
}

.quiz-header {
  @apply mb-8;
}

.quiz-meta {
  @apply flex items-center gap-4 mt-2;
}

.question-count,
.time-limit {
  @apply px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm;
}

.quiz-form {
  @apply space-y-6;
}

.question-card {
  @apply bg-white rounded-lg shadow-md p-6;
}

.question-header {
  @apply flex justify-between items-center mb-4;
}

.question-number {
  @apply text-lg font-semibold text-gray-900;
}

.question-points {
  @apply text-sm text-gray-500;
}

.question-text {
  @apply text-gray-700 mb-4;
}

.options-list {
  @apply space-y-3;
}

.option-item {
  @apply flex items-center p-3 border rounded-lg cursor-pointer transition-colors;
}

.option-item:hover {
  @apply bg-gray-50;
}

.option-item.selected {
  @apply border-orange bg-orange-50;
}

.option-radio {
  @apply mr-3;
}

.option-text {
  @apply text-gray-700;
}

.quiz-actions {
  @apply mt-8 flex justify-end;
}

.submit-button {
  @apply px-6 py-2 bg-orange text-white rounded-lg hover:bg-orange-dark transition-colors disabled:opacity-50;
}

.quiz-results {
  @apply mt-8 bg-white rounded-lg shadow-md p-6;
}

.results-summary {
  @apply mb-6;
}

.score {
  @apply text-center mb-4;
}

.score-label {
  @apply text-gray-600;
}

.score-value {
  @apply text-3xl font-bold text-orange ml-2;
}

.stats {
  @apply grid grid-cols-2 gap-4;
}

.stat-item {
  @apply text-center;
}

.stat-label {
  @apply text-gray-600;
}

.stat-value {
  @apply text-xl font-semibold text-gray-900 ml-2;
}

.results-actions {
  @apply flex justify-center gap-4;
}

.retake-button,
.continue-button {
  @apply px-6 py-2 rounded-lg transition-colors;
}

.retake-button {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200;
}

.continue-button {
  @apply bg-orange text-white hover:bg-orange-dark;
}
</style>
