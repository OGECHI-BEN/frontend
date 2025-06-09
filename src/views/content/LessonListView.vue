<template>
  <div class="min-h-screen bg-gray-900">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-white">
              {{ language.toUpperCase() }} - {{ level.charAt(0).toUpperCase() + level.slice(1) }}
            </h1>
            <p class="text-gray-400 mt-2">Master the fundamentals and advance your skills</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-center">
              <span class="text-2xl font-bold text-orange">{{ progress }}%</span>
              <p class="text-sm text-gray-400">Progress</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
        <div class="spinner"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-500 mb-4">{{ error }}</p>
        <button
          @click="fetchLessons"
          class="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-dark transition-colors"
        >
          Retry
        </button>
      </div>

      <!-- Lessons Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="lesson in lessons"
          :key="lesson.id"
          class="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold text-white">{{ lesson.title }}</h3>
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full"
                :class="
                  lesson.completed ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
                "
              >
                {{ lesson.completed ? 'Completed' : 'Not Started' }}
              </span>
            </div>
            <p class="text-gray-400 mb-4">{{ lesson.description }}</p>
            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>{{ lesson.estimated_time }} min</span>
              <span>{{ lesson.points }} points</span>
            </div>
          </div>
          <div class="bg-gray-700 px-6 py-4">
            <router-link
              :to="{
                name: 'learn-lesson',
                params: {
                  language: language,
                  level: level,
                  lesson: lesson.slug,
                },
              }"
              class="block w-full text-center bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange-dark transition-colors"
            >
              {{ lesson.completed ? 'Review Lesson' : 'Start Lesson' }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && lessons.length === 0" class="text-center py-12">
        <p class="text-gray-400">No lessons available for this level yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { lessonService } from '@/services/api'

const route = useRoute()
const loading = ref(true)
const error = ref(null)
const lessons = ref([])
const progress = ref(0)

const language = computed(() => route.params.language)
const level = computed(() => route.params.level)

const fetchLessons = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await lessonService.getLessons(language.value, level.value)
    lessons.value = response.data.data
    progress.value = response.data.progress || 0
  } catch (err) {
    console.error('Error fetching lessons:', err)
    if (err.response?.status === 401) {
      error.value = 'Please log in to view lessons'
    } else if (err.response?.status === 404) {
      error.value = 'No lessons found for this level'
    } else {
      error.value = 'Failed to load lessons. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(fetchLessons)
</script>

<style scoped>
.spinner {
  @apply w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin;
}
</style>
