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
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-500">{{ level.lessons.length }} lessons</span>
          <button
            class="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-dark transition-colors"
            @click.stop="startLevel(level.id)"
          >
            Start Learning
          </button>
        </div>
        <!-- Lesson tags/titles as clickable links -->
        <div v-if="level.lessons.length" class="flex flex-wrap gap-2 mt-2">
          <router-link
            v-for="lesson in level.lessons"
            :key="lesson.id"
            :to="{
              name: 'learn-lesson', // CORRECTED ROUTE NAME
              params: {
                language: 'html',
                level: level.id,
                lesson: lesson.slug, // PASSING SLUG AS A ROUTE PARAMETER
              },
            }"
            class="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded hover:bg-orange hover:text-white transition-colors"
            @click.stop
          >
            {{ lesson.title }}
          </router-link>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useContentStore } from '@/stores/content'

defineOptions({
  name: 'HtmlIntroduction', // Linter warning fix
})

const router = useRouter()
const contentStore = useContentStore()

const levels = ref([
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'Learn the basics of HTML, including elements, attributes, and basic structure.',
    lessons: [],
    progress: 0,
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    description: 'Dive deeper into HTML5 features, forms, and semantic elements.',
    lessons: [],
    progress: 0,
  },
  {
    id: 'expert',
    name: 'Expert',
    description:
      'Master advanced HTML concepts, accessibility, and modern web development practices.',
    lessons: [],
    progress: 0,
  },
])

const fetchLessonsForAllLevels = async () => {
  for (const level of levels.value) {
    await contentStore.fetchLessons('html', level.id)
    // Clone the lessons array to avoid reactivity issues
    level.lessons = [...contentStore.lessons]
    const completed = level.lessons.filter((l) => l.completed).length
    level.progress = level.lessons.length ? Math.round((completed / level.lessons.length) * 100) : 0
  }
}

onMounted(fetchLessonsForAllLevels)

const selectLevel = (levelId) => {
  // When clicking on a level card itself, navigate to the lesson list view for that level
  router.push({
    name: 'learn-level', // Corrected route name
    params: {
      language: 'html',
      level: levelId,
    },
  })
}

const startLevel = (levelId) => {
  // This button should also navigate to the lesson list view for that level
  router.push({
    name: 'learn-level', // Corrected route name
    params: {
      language: 'html',
      level: levelId,
    },
  })
}
</script>
