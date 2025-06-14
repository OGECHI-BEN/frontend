<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header Section -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Learning Dashboard</h1>
      <p class="mt-2 text-gray-600">Track your progress and continue learning</p>
    </div>

    <!-- Loading State -->
    <div v-if="learningStore.loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="learningStore.error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
    >
      {{ learningStore.error }}
    </div>

    <!-- Main Content -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Languages Section -->
      <div
        v-for="language in learningStore.languages"
        :key="language.id"
        class="bg-white rounded-lg shadow-md p-6"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ language.name }}</h2>

        <!-- Levels Section -->
        <div v-for="level in language.levels" :key="level.id" class="mb-6">
          <h3 class="text-lg font-medium text-gray-700 mb-3">{{ level.name }}</h3>

          <!-- Lessons List -->
          <div class="space-y-3">
            <router-link
              v-for="lesson in level.lessons"
              :key="lesson.id"
              :to="{
                name: 'learn-lesson',
                params: {
                  language: language.slug,
                  level: level.slug,
                  lesson: lesson.slug,
                },
              }"
              class="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-gray-800">{{ lesson.title }}</h4>
                  <p class="text-sm text-gray-500">{{ lesson.description }}</p>
                </div>
                <!-- Progress Indicator -->
                <div class="flex items-center">
                  <span v-if="getLessonProgress(lesson.id)" class="text-green-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </span>
                  <span v-else class="text-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLearningStore } from '../../stores/learning'

// Initialize the learning store
const learningStore = useLearningStore()

// Fetch data when component is mounted
onMounted(() => {
  learningStore.fetchLanguages()
  learningStore.fetchProgress()
})

// Helper function to check if a lesson is completed
function getLessonProgress(lessonId) {
  return learningStore.userProgress.find((p) => p.lesson_id === lessonId && p.completed)
}
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
