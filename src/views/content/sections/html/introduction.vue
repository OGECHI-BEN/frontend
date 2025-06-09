<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">Introduction to HTML</h2>

    <!-- Level Selection -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="level in levels"
        :key="level.id"
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        @click="selectLevel(level.id)"
      >
        <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ level.name }}</h3>
        <p class="text-gray-600 mb-4">{{ level.description }}</p>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">{{ level.lessons }} lessons</span>
          <button
            class="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-dark transition-colors"
            @click.stop="startLevel(level.id)"
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>

    <!-- Progress Overview -->
    <div class="bg-white p-6 rounded-lg shadow-md mt-8">
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Your Progress</h3>
      <div class="space-y-4">
        <div v-for="level in levels" :key="level.id" class="flex items-center justify-between">
          <span class="text-gray-700">{{ level.name }}</span>
          <div class="flex items-center space-x-2">
            <div class="w-32 h-2 bg-gray-200 rounded-full">
              <div
                class="h-full bg-orange rounded-full"
                :style="{ width: `${level.progress}%` }"
              ></div>
            </div>
            <span class="text-sm text-gray-500">{{ level.progress }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const levels = ref([
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'Learn the basics of HTML, including elements, attributes, and basic structure.',
    lessons: 5,
    progress: 0,
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    description: 'Dive deeper into HTML5 features, forms, and semantic elements.',
    lessons: 7,
    progress: 0,
  },
  {
    id: 'expert',
    name: 'Expert',
    description:
      'Master advanced HTML concepts, accessibility, and modern web development practices.',
    lessons: 8,
    progress: 0,
  },
])

const selectLevel = (levelId) => {
  // Navigate to the first lesson of the selected level
  router.push({
    name: 'content',
    params: {
      language: 'html',
      level: levelId,
    },
    query: {
      section: 'lesson-1',
    },
  })
}

const startLevel = (levelId) => {
  // Start the level and track progress
  selectLevel(levelId)
}
</script>
