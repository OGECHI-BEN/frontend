<template>
  <div class="min-h-screen bg-dark">
    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb-nav">
      <router-link :to="{ name: 'home' }" class="breadcrumb-item">Home</router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link
        :to="{ name: 'content-list', params: { language, level } }"
        class="breadcrumb-item"
      >
        {{ language }} - {{ level }}
      </router-link>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item current">{{ lesson?.title }}</span>
    </nav>

    <!-- Lesson Header -->
    <div class="bg-white shadow">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ lesson?.title }}</h1>
            <p class="mt-1 text-sm text-gray-500">
              {{ lesson?.language?.name }} - {{ lesson?.level?.name }}
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-500">
              Estimated time: {{ lesson?.estimated_time }} minutes
            </div>
            <button
              v-if="!isCompleted"
              @click="completeLesson"
              class="px-4 py-2 bg-orange text-white rounded-lg hover:bg-gold transition-colors"
              :disabled="loading"
            >
              {{ loading ? 'Completing...' : 'Mark as Complete' }}
            </button>
            <div v-else class="text-green-500"><i class="fas fa-check-circle"></i> Completed</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-4">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Lesson Sections</h2>
            <nav class="space-y-2">
              <button
                v-for="section in sections"
                :key="section.id"
                @click="currentSection = section.id"
                class="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-orange"
                :class="{ 'bg-orange text-white hover:text-white': currentSection === section.id }"
              >
                {{ section.title }}
              </button>
            </nav>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-lg shadow p-6">
            <!-- Loading State -->
            <div v-if="loading" class="loading-state">
              <div class="spinner"></div>
              <p>Loading lesson content...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="error-state">
              <i class="fas fa-exclamation-circle error-icon"></i>
              <p class="error-message">{{ error }}</p>
              <button @click="fetchLesson" class="btn btn-secondary">
                <i class="fas fa-redo"></i> Retry
              </button>
            </div>

            <!-- Content Sections -->
            <div v-else>
              <!-- Introduction Section -->
              <section v-if="currentSection === 'introduction'" class="content-section">
                <div class="section-content">
                  <div
                    v-for="(content, index) in lesson?.content"
                    :key="index"
                    class="content-block"
                  >
                    <h2 class="text-xl font-semibold mb-4">{{ content.title }}</h2>
                    <div class="prose" v-html="content.content"></div>

                    <!-- Interactive Code Example -->
                    <div v-if="content.code_example" class="code-example">
                      <div class="code-header">
                        <h3>Try it yourself:</h3>
                        <div class="code-actions">
                          <button
                            @click="copyCode(content.code_example)"
                            class="btn btn-sm"
                            title="Copy code to clipboard"
                          >
                            <i class="fas fa-copy"></i> Copy
                          </button>
                          <button
                            v-if="content.is_interactive"
                            @click="resetPlayground(index)"
                            class="btn btn-sm"
                            title="Reset code to original"
                          >
                            <i class="fas fa-undo"></i> Reset
                          </button>
                        </div>
                      </div>
                      <pre><code :class="lesson?.language">{{ content.code_example }}</code></pre>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Exercises Section -->
              <section v-if="currentSection === 'exercises'" class="content-section">
                <div class="exercises-list">
                  <div
                    v-for="exercise in lesson?.exercises"
                    :key="exercise.id"
                    class="exercise-card"
                  >
                    <div class="exercise-header">
                      <h3>{{ exercise.title }}</h3>
                      <span class="points" :title="`${exercise.points} points available`">
                        <i class="fas fa-star"></i> {{ exercise.points }} points
                      </span>
                    </div>
                    <p class="exercise-description">{{ exercise.description }}</p>

                    <!-- Interactive Exercise -->
                    <div class="exercise-content">
                      <div class="code-editor">
                        <textarea
                          v-model="exercise.userCode"
                          class="w-full h-48 p-4 font-mono text-sm bg-gray-900 text-white rounded-lg"
                          :placeholder="exercise.placeholder"
                        ></textarea>
                      </div>
                      <div class="exercise-actions">
                        <button
                          @click="submitExercise(exercise)"
                          class="btn btn-primary"
                          :disabled="loading"
                        >
                          {{ loading ? 'Submitting...' : 'Submit Solution' }}
                        </button>
                        <button @click="resetExercise(exercise)" class="btn btn-secondary">
                          Reset Code
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Quiz Section -->
              <section v-if="currentSection === 'quiz'" class="content-section">
                <div v-if="!quizStarted" class="quiz-intro">
                  <h2>Ready to test your knowledge?</h2>
                  <p>This quiz contains {{ lesson?.quiz?.questions?.length }} questions.</p>
                  <button @click="startQuiz" class="btn btn-primary">
                    <i class="fas fa-play"></i> Start Quiz
                  </button>
                </div>

                <div v-else class="quiz-content">
                  <div class="quiz-progress">
                    <div class="progress-bar">
                      <div
                        class="progress-fill"
                        :style="{
                          width: `${(currentQuestionIndex / lesson?.quiz?.questions?.length) * 100}%`,
                        }"
                      ></div>
                    </div>
                    <span
                      >Question {{ currentQuestionIndex + 1 }} of
                      {{ lesson?.quiz?.questions?.length }}</span
                    >
                  </div>

                  <div class="question-card">
                    <h3>{{ currentQuestion?.question }}</h3>
                    <div class="options-list">
                      <label
                        v-for="option in currentQuestion?.options"
                        :key="option"
                        class="option-item"
                        :class="{
                          selected: userAnswers[currentQuestionIndex] === option,
                          correct: showResults && option === currentQuestion?.correct_answer,
                          incorrect:
                            showResults &&
                            userAnswers[currentQuestionIndex] === option &&
                            option !== currentQuestion?.correct_answer,
                        }"
                      >
                        <input
                          type="radio"
                          :value="option"
                          v-model="userAnswers[currentQuestionIndex]"
                          :disabled="showResults"
                        />
                        <span class="option-text">{{ option }}</span>
                      </label>
                    </div>

                    <div v-if="showResults" class="question-feedback">
                      <p :class="isAnswerCorrect ? 'text-success' : 'text-error'">
                        <i
                          :class="isAnswerCorrect ? 'fas fa-check-circle' : 'fas fa-times-circle'"
                        ></i>
                        {{ isAnswerCorrect ? 'Correct!' : 'Incorrect!' }}
                      </p>
                      <p class="explanation">{{ currentQuestion?.explanation }}</p>
                    </div>

                    <div class="question-actions">
                      <button
                        v-if="!showResults"
                        @click="checkAnswer"
                        class="btn btn-primary"
                        :disabled="!userAnswers[currentQuestionIndex]"
                      >
                        Check Answer
                      </button>
                      <button
                        v-else
                        @click="nextQuestion"
                        class="btn btn-primary"
                        :disabled="isLastQuestion"
                      >
                        {{ isLastQuestion ? 'Finish Quiz' : 'Next Question' }}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div class="toast-container">
      <transition-group name="toast">
        <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.type">
          <i :class="getToastIcon(toast.type)"></i>
          {{ toast.message }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentStore } from '../../stores/content'

const route = useRoute()
const router = useRouter()
const contentStore = useContentStore()

const currentSection = ref('content')
const quizStarted = ref(false)
const exerciseAnswers = ref({})
const quizAnswers = ref({})

const sections = [
  { id: 'content', title: 'Lesson Content' },
  { id: 'exercises', title: 'Practice Exercises' },
  { id: 'quiz', title: 'Quiz' },
]

const lesson = computed(() => contentStore.currentLesson)
const loading = computed(() => contentStore.loading)
const isCompleted = computed(() => contentStore.isLessonCompleted(lesson.value?.id))
const quiz = computed(() => contentStore.quiz)

const isQuizComplete = computed(() => {
  if (!quiz.value) return false
  return quiz.value.every((question) => quizAnswers.value[question.id])
})

// New state for enhanced features
const toasts = ref([])
const fullscreenStates = ref({})

onMounted(async () => {
  const { language, level, lesson: lessonSlug } = route.params
  await contentStore.fetchLesson(language, level, lessonSlug)
})

const completeLesson = async () => {
  const { language, level, lesson: lessonSlug } = route.params
  await contentStore.completeLesson(language, level, lessonSlug)
}

const submitExercise = async (exercise) => {
  try {
    await contentStore.submitExercise(exercise.id, exercise.userCode)
    showToast('Exercise submitted successfully!', 'success')
  } catch (error) {
    showToast(error.message, 'error')
  }
}

const startQuiz = async () => {
  const { language, level, lesson: lessonSlug } = route.params
  await contentStore.startQuiz(language, level, lessonSlug)
  quizStarted.value = true
}

const submitQuiz = async () => {
  try {
    const result = await contentStore.submitQuiz(quizAnswers.value)
    // Handle success (e.g., show score, redirect)
    console.log('Quiz submitted:', result)
    router.push({
      name: 'quiz-results',
      params: {
        language: route.params.language,
        level: route.params.level,
      },
    })
  } catch (error) {
    // Handle error
    console.error('Failed to submit quiz:', error)
  }
}

// Methods for enhanced features
const getSectionIcon = (sectionId) => {
  const icons = {
    introduction: 'fas fa-book',
    exercises: 'fas fa-code',
    quiz: 'fas fa-question-circle',
  }
  return icons[sectionId] || 'fas fa-circle'
}

const getToastIcon = (type) => {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-times-circle',
    info: 'fas fa-info-circle',
    warning: 'fas fa-exclamation-circle',
  }
  return icons[type] || 'fas fa-info-circle'
}

const showToast = (message, type = 'info', duration = 3000) => {
  const id = Date.now()
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }, duration)
}

const isFullscreen = (index) => fullscreenStates.value[index]

const toggleFullscreen = (index) => {
  fullscreenStates.value[index] = !fullscreenStates.value[index]
}

// Enhanced existing methods
const copyCode = (code) => {
  navigator.clipboard.writeText(code)
  showToast('Code copied to clipboard!', 'success')
}

const showHint = (exerciseId) => {
  const exercise = lesson.value.exercises.find((e) => e.id === exerciseId)
  if (exercise?.hint) {
    showToast(exercise.hint, 'info', 5000)
  }
}

const resetExercise = (exercise) => {
  exercise.userCode = exercise.initialCode
}

// Cleanup
onUnmounted(() => {
  // Reset fullscreen states
  fullscreenStates.value = {}
})
</script>

<style>
.prose {
  max-width: none;
}

.prose h1 {
  @apply text-3xl font-bold text-gray-900 mb-4;
}

.prose h2 {
  @apply text-2xl font-semibold text-gray-800 mb-3;
}

.prose h3 {
  @apply text-xl font-semibold text-gray-800 mb-2;
}

.prose p {
  @apply text-gray-600 mb-4;
}

.prose code {
  @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono;
}

.prose pre {
  @apply bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto;
}

.prose pre code {
  @apply bg-transparent p-0;
}

/* New styles for enhanced features */
.breadcrumb-nav {
  @apply flex items-center space-x-2 px-4 py-2 bg-gray-100;
}

.breadcrumb-item {
  @apply text-gray-600 hover:text-orange;
}

.breadcrumb-separator {
  @apply text-gray-400;
}

.breadcrumb-item.current {
  @apply text-gray-900 font-medium;
}

.loading-state {
  @apply flex flex-col items-center justify-center py-12;
}

.spinner {
  @apply w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin mb-4;
}

.error-state {
  @apply text-center py-12;
}

.error-icon {
  @apply text-red-500 text-4xl mb-4;
}

.error-message {
  @apply text-red-500 mb-4;
}

.content-section {
  @apply space-y-6;
}

.code-example {
  @apply bg-gray-900 rounded-lg overflow-hidden;
}

.code-header {
  @apply flex justify-between items-center px-4 py-2 bg-gray-800;
}

.code-actions {
  @apply flex space-x-2;
}

.btn {
  @apply px-4 py-2 rounded-lg transition-colors;
}

.btn-primary {
  @apply bg-orange text-white hover:bg-gold;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-700 hover:bg-gray-300;
}

.btn-sm {
  @apply px-2 py-1 text-sm;
}

.exercise-card {
  @apply bg-gray-50 rounded-lg p-6 mb-6;
}

.exercise-header {
  @apply flex justify-between items-center mb-4;
}

.points {
  @apply text-orange font-medium;
}

.exercise-description {
  @apply text-gray-600 mb-4;
}

.exercise-actions {
  @apply flex space-x-4 mt-4;
}

.quiz-intro {
  @apply text-center py-12;
}

.quiz-progress {
  @apply mb-6;
}

.progress-bar {
  @apply w-full bg-gray-200 rounded-full h-2 mb-2;
}

.progress-fill {
  @apply bg-orange h-2 rounded-full transition-all duration-300;
}

.question-card {
  @apply bg-white rounded-lg p-6;
}

.options-list {
  @apply space-y-3 mt-4;
}

.option-item {
  @apply flex items-center p-3 rounded-lg border cursor-pointer transition-colors;
}

.option-item.selected {
  @apply border-orange bg-orange/10;
}

.option-item.correct {
  @apply border-green-500 bg-green-500/10;
}

.option-item.incorrect {
  @apply border-red-500 bg-red-500/10;
}

.option-text {
  @apply ml-3;
}

.question-feedback {
  @apply mt-4 p-4 rounded-lg;
}

.text-success {
  @apply text-green-500;
}

.text-error {
  @apply text-red-500;
}

.explanation {
  @apply mt-2 text-gray-600;
}

.question-actions {
  @apply mt-6;
}

.toast-container {
  @apply fixed bottom-4 right-4 z-50 space-y-2;
}

.toast {
  @apply fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white shadow-lg transform transition-all duration-300;
}

.toast.success {
  @apply bg-orange;
}

.toast.error {
  @apply bg-red-500;
}

.toast.info {
  @apply bg-gold;
}

.toast.warning {
  @apply bg-orange;
}

.toast-enter-active,
.toast-leave-active {
  @apply transition-all duration-300;
}

.toast-enter-from,
.toast-leave-to {
  @apply opacity-0 transform translate-y-2;
}

.toast-enter-to,
.toast-leave-from {
  @apply opacity-100 transform translate-y-0;
}

.toast i {
  @apply mr-2;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.playground-content.fullscreen {
  @apply fixed inset-0 z-50 bg-white p-4;
}

.playground-content.fullscreen .editor,
.playground-content.fullscreen .preview {
  @apply h-[calc(100vh-8rem)];
}

/* Enhanced existing styles */
.lesson-meta .badge i {
  @apply mr-1;
}

.exercise-actions .btn i,
.quiz-content .btn i {
  @apply mr-2;
}

.test-case i {
  @apply text-lg;
}

.test-case.passed i {
  @apply text-green-500;
}

.test-case.failed i {
  @apply text-red-500;
}

.question-feedback i {
  @apply mr-2 text-lg;
}

.text-success i {
  @apply text-green-500;
}

.text-error i {
  @apply text-red-500;
}
</style>
