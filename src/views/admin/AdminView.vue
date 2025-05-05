<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-600">Welcome,</span>
          <span class="font-semibold text-indigo-600">{{ user?.username }}</span>
        </div>
      </div>

      <!-- Navigation -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <nav class="flex space-x-4">
          <router-link
            to="/admin/quizzes"
            class="px-4 py-2 rounded-lg transition-colors"
            :class="{
              'bg-indigo-600 text-white': $route.name === 'quiz-manager',
              'text-gray-600 hover:bg-gray-100': $route.name !== 'quiz-manager',
            }"
          >
            Quiz Manager
          </router-link>
          <!-- Add more admin navigation links here -->
        </nav>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>
