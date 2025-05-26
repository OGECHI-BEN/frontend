<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Level Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 capitalize">{{ level }} Level</h1>
            <p class="mt-2 text-sm text-gray-500">{{ levelDescription }}</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-center">
              <span class="text-2xl font-bold text-orange">{{ progress }}%</span>
              <p class="text-sm text-gray-500">Complete</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Lessons List -->
      <div class="bg-white shadow rounded-lg divide-y divide-gray-200">
        <div v-for="lesson in lessons" :key="lesson.id" class="p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div
                class="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center"
                :class="{
                  'bg-green-100': lesson.completed,
                  'bg-orange-100': !lesson.completed && lesson.available,
                  'bg-gray-100': !lesson.available,
                }"
              >
                <i
                  class="fas"
                  :class="{
                    'fa-check text-green-600': lesson.completed,
                    'fa-lock text-gray-400': !lesson.available,
                    'fa-book text-orange-600': lesson.available && !lesson.completed,
                  }"
                ></i>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">{{ lesson.title }}</h3>
                <p class="text-sm text-gray-500">{{ lesson.description }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-500">{{ lesson.duration }} min</span>
              <button
                @click="startLesson(lesson)"
                :disabled="!lesson.available"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange hover:bg-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange disabled:opacity-50"
              >
                {{ lesson.completed ? 'Review' : 'Start' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const level = computed(() => route.params.level)

const levelDescription = computed(() => {
  switch (level.value) {
    case 'beginner':
      return 'Master basic HTML tags, structure, and elements'
    case 'intermediate':
      return 'Learn forms, tables, semantic HTML, and accessibility'
    case 'expert':
      return 'Master advanced HTML5 features, APIs, and optimization'
    default:
      return ''
  }
})

// Mock data - Replace with actual API calls
const lessons = ref([
  {
    id: 1,
    title: 'Introduction to HTML',
    description: 'Learn the basics of HTML and its role in web development',
    duration: 15,
    completed: true,
    available: true,
  },
  {
    id: 2,
    title: 'Basic HTML Structure',
    description: 'Understanding HTML document structure and essential elements',
    duration: 20,
    completed: true,
    available: true,
  },
  {
    id: 3,
    title: 'Text Formatting',
    description: 'Learn how to format text using HTML tags',
    duration: 25,
    completed: false,
    available: true,
  },
  {
    id: 4,
    title: 'Links and Images',
    description: 'Working with hyperlinks and images in HTML',
    duration: 30,
    completed: false,
    available: true,
  },
  {
    id: 5,
    title: 'Lists and Tables',
    description: 'Creating and styling lists and tables',
    duration: 35,
    completed: false,
    available: true,
  },
])

const progress = computed(() => {
  const completed = lessons.value.filter((lesson) => lesson.completed).length
  return Math.round((completed / lessons.value.length) * 100)
})

const startLesson = (lesson) => {
  router.push(`/learn/${level.value}/${lesson.id}`)
}

onMounted(() => {
  // Fetch lessons for the current level
  // This would be replaced with an actual API call
  console.log(`Loading lessons for ${level.value} level`)
})
</script>
