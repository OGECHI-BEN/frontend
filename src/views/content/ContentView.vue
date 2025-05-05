<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 capitalize">
              {{ language }} {{ level }} Level
            </h1>
            <p class="text-gray-600 mt-2">
              Master {{ language }} concepts at the {{ level }} level
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <p class="text-sm text-gray-600">Your Level</p>
              <p class="text-xl font-semibold text-indigo-600">
                {{ userLevels[language] }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">Total Points</p>
              <p class="text-xl font-semibold text-indigo-600">
                {{ totalPoints }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div v-if="loading" class="flex justify-center items-center h-64">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
            <div v-else-if="error" class="text-red-600 text-center py-8">
              {{ error }}
            </div>
            <div v-else>
              <div v-html="content" class="prose max-w-none"></div>

              <!-- Quiz Section -->
              <div v-if="quiz" class="mt-8 border-t pt-8">
                <h2 class="text-2xl font-bold mb-6">Test Your Knowledge</h2>
                <div class="space-y-6">
                  <div
                    v-for="(question, index) in quiz.questions"
                    :key="index"
                    class="bg-gray-50 p-6 rounded-lg"
                  >
                    <p class="font-semibold mb-4">{{ question.text }}</p>
                    <div class="space-y-3">
                      <label
                        v-for="option in question.options"
                        :key="option"
                        class="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100"
                      >
                        <input
                          type="radio"
                          :name="'question-' + index"
                          :value="option"
                          v-model="answers[index]"
                          class="h-4 w-4 text-indigo-600"
                        />
                        <span>{{ option }}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  @click="submitQuiz"
                  class="mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700"
                  :disabled="!isQuizComplete"
                >
                  Submit Answers
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-semibold mb-4">Progress</h3>
            <div class="space-y-4">
              <div v-for="lang in ['html', 'css', 'python']" :key="lang" class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="capitalize">{{ lang }}</span>
                  <span class="font-semibold">{{ userLevels[lang] }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-indigo-600 h-2 rounded-full"
                    :style="{ width: getProgressWidth(lang) }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const language = computed(() => route.params.language)
const level = computed(() => route.params.level)
const userLevels = computed(() => authStore.userLevels)
const totalPoints = computed(() => authStore.totalPoints)

const loading = ref(true)
const error = ref(null)
const content = ref('')
const quiz = ref(null)
const answers = ref([])

// Mock content - Replace with actual API call
onMounted(async () => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock content
    content.value = `
      <h2>Introduction to ${language.value}</h2>
      <p>Welcome to the ${level.value} level of ${language.value}!</p>
      <p>In this section, you'll learn advanced concepts and techniques...</p>
    `

    // Mock quiz
    quiz.value = {
      questions: [
        {
          text: 'What is the main purpose of this concept?',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          correct: 'Option 1',
        },
        {
          text: 'Which of the following is correct?',
          options: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
          correct: 'Answer B',
        },
      ],
    }

    answers.value = new Array(quiz.value.questions.length).fill('')
  } catch (error) {
    error.value = 'Failed to load content'
  } finally {
    loading.value = false
  }
})

const isQuizComplete = computed(() => {
  return answers.value.every((answer) => answer !== '')
})

const getProgressWidth = (lang) => {
  const levels = ['beginner', 'intermediate', 'expert']
  const currentLevel = userLevels.value[lang]
  const progress = ((levels.indexOf(currentLevel) + 1) / levels.length) * 100
  return `${progress}%`
}

const submitQuiz = async () => {
  if (!isQuizComplete.value) return

  try {
    const correctAnswers = quiz.value.questions.filter(
      (q, i) => q.correct === answers.value[i],
    ).length

    const points = Math.round((correctAnswers / quiz.value.questions.length) * 100)

    await authStore.updateUserProgress(language.value, level.value, points)

    // Show success message or redirect
  } catch (error) {
    error.value = 'Failed to submit quiz'
  }
}
</script>
