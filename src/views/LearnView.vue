<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Learn to Code</h1>

      <!-- Language Tracks -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- HTML Track -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center justify-center mb-4">
            <img src="../assets/images/html5.png" alt="HTML5" class="w-16 h-16" />
          </div>
          <h2 class="text-xl font-semibold text-center mb-4">HTML</h2>
          <p class="text-gray-600 mb-4">Learn the fundamentals of web structure and markup.</p>
          <div class="space-y-2">
            <router-link
              v-for="level in ['Beginner', 'Intermediate', 'Expert']"
              :key="level"
              :to="isAuthenticated ? `/content/html/${level.toLowerCase()}` : '/login'"
              class="block w-full text-center py-2 px-4 rounded-lg transition-colors"
              :class="
                isAuthenticated
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 text-gray-600'
              "
            >
              {{ level }} Level
            </router-link>
          </div>
        </div>

        <!-- CSS Track -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center justify-center mb-4">
            <img src="../assets/images/css3.png" alt="CSS3" class="w-16 h-16" />
          </div>
          <h2 class="text-xl font-semibold text-center mb-4">CSS</h2>
          <p class="text-gray-600 mb-4">
            Master styling and layout techniques for beautiful websites.
          </p>
          <div class="space-y-2">
            <router-link
              v-for="level in ['Beginner', 'Intermediate', 'Expert']"
              :key="level"
              :to="isAuthenticated ? `/content/css/${level.toLowerCase()}` : '/login'"
              class="block w-full text-center py-2 px-4 rounded-lg transition-colors"
              :class="
                isAuthenticated
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 text-gray-600'
              "
            >
              {{ level }} Level
            </router-link>
          </div>
        </div>

        <!-- Python Track -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center justify-center mb-4">
            <img src="../assets/images/python.png" alt="Python" class="w-16 h-16" />
          </div>
          <h2 class="text-xl font-semibold text-center mb-4">Python</h2>
          <p class="text-gray-600 mb-4">Learn programming fundamentals with Python.</p>
          <div class="space-y-2">
            <router-link
              v-for="level in ['Beginner', 'Intermediate', 'Expert']"
              :key="level"
              :to="isAuthenticated ? `/content/python/${level.toLowerCase()}` : '/login'"
              class="block w-full text-center py-2 px-4 rounded-lg transition-colors"
              :class="
                isAuthenticated
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 text-gray-600'
              "
            >
              {{ level }} Level
            </router-link>
          </div>
        </div>
      </div>

      <!-- Login Prompt -->
      <div v-if="!isAuthenticated" class="mt-8 text-center">
        <p class="text-gray-600 mb-4">
          Sign in to access all learning materials and track your progress!
        </p>
        <router-link
          to="/login"
          class="inline-block bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Sign In
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>
