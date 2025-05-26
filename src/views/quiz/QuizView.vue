<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Quiz Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">HTML Quiz</h1>
        <p class="mt-2 text-sm text-gray-500">Test your knowledge and earn points</p>
      </div>

      <!-- Quiz Levels -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Beginner Quiz -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Beginner Quiz</h3>
            <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              10 points per question
            </span>
          </div>
          <p class="text-sm text-gray-500 mb-4">Test your knowledge of basic HTML concepts</p>
          <ul class="space-y-2 mb-4">
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              10 multiple choice questions
            </li>
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              15 minutes time limit
            </li>
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Basic HTML tags and structure
            </li>
          </ul>
          <button
            @click="startQuiz('beginner')"
            class="w-full bg-orange text-white px-4 py-2 rounded-md hover:bg-gold transition-colors"
          >
            Start Quiz
          </button>
        </div>

        <!-- Intermediate Quiz -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Intermediate Quiz</h3>
            <span
              class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800"
            >
              20 points per question
            </span>
          </div>
          <p class="text-sm text-gray-500 mb-4">
            Challenge yourself with intermediate HTML concepts
          </p>
          <ul class="space-y-2 mb-4">
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              10 mixed question types
            </li>
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              20 minutes time limit
            </li>
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Forms, tables, and semantic HTML
            </li>
          </ul>
          <button
            @click="startQuiz('intermediate')"
            :disabled="!canAccessIntermediate"
            class="w-full bg-orange text-white px-4 py-2 rounded-md hover:bg-gold transition-colors disabled:opacity-50"
          >
            {{ canAccessIntermediate ? 'Start Quiz' : 'Complete Beginner First' }}
          </button>
        </div>

        <!-- Expert Quiz -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Expert Quiz</h3>
            <span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
              30 points per question
            </span>
          </div>
          <p class="text-sm text-gray-500 mb-4">Master advanced HTML5 concepts and features</p>
          <ul class="space-y-2 mb-4">
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              10 advanced questions
            </li>
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              25 minutes time limit
            </li>
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              HTML5 APIs and optimization
            </li>
          </ul>
          <button
            @click="startQuiz('expert')"
            :disabled="!canAccessExpert"
            class="w-full bg-orange text-white px-4 py-2 rounded-md hover:bg-gold transition-colors disabled:opacity-50"
          >
            {{ canAccessExpert ? 'Start Quiz' : 'Complete Intermediate First' }}
          </button>
        </div>
      </div>

      <!-- Quiz History -->
      <div class="mt-12">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Quiz History</h2>
        <div class="bg-white shadow rounded-lg divide-y divide-gray-200">
          <div v-for="quiz in quizHistory" :key="quiz.id" class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">{{ quiz.title }}</h3>
                <p class="text-sm text-gray-500">{{ quiz.date }}</p>
              </div>
              <div class="flex items-center space-x-4">
                <span class="text-sm font-medium text-gray-900">Score: {{ quiz.score }}%</span>
                <span class="text-sm text-gray-500">Points: {{ quiz.points }}</span>
                <button @click="reviewQuiz(quiz)" class="text-orange hover:text-gold">
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Mock quiz history data
const quizHistory = ref([
  {
    id: 1,
    title: 'Beginner HTML Quiz',
    date: '2024-02-20',
    score: 85,
    points: 85,
  },
  {
    id: 2,
    title: 'Beginner HTML Quiz',
    date: '2024-02-18',
    score: 70,
    points: 70,
  },
])

// Computed properties for quiz access
const canAccessIntermediate = computed(() => {
  // Check if user has completed beginner level
  return true // Replace with actual check
})

const canAccessExpert = computed(() => {
  // Check if user has completed intermediate level
  return false // Replace with actual check
})

// Methods
const startQuiz = (level) => {
  router.push(`/quiz/${level}`)
}

const reviewQuiz = (quiz) => {
  // Implement quiz review functionality
  console.log('Reviewing quiz:', quiz)
}
</script>
