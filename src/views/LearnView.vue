<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Welcome Section -->
    <div class="bg-gray-800 shadow-lg">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img
              :src="authStore.userAvatar || '/default-avatar.png'"
              alt="User Avatar"
              class="h-12 w-12 rounded-full border-2 border-orange"
            />
            <div class="ml-4">
              <h1 class="text-2xl font-bold text-white">
                Welcome back, {{ authStore.user?.username }}!
              </h1>
              <p class="text-sm text-gray-400">Continue your learning journey</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-center">
              <span class="text-2xl font-bold text-orange">{{ authStore.userPoints }}</span>
              <p class="text-sm text-gray-400">Points</p>
            </div>
            <div class="text-center">
              <span class="text-2xl font-bold text-orange">{{ completedLessons }}</span>
              <p class="text-sm text-gray-400">Lessons Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Language Selection -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-white mb-4">Choose Your Language</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            @click="selectedLanguage = 'html'"
            class="bg-gray-800 rounded-lg shadow-lg p-6 border-2 transition-all"
            :class="selectedLanguage === 'html' ? 'border-orange' : 'border-gray-700'"
          >
            <div class="text-center">
              <i class="fab fa-html5 text-4xl text-orange mb-2"></i>
              <h3 class="text-lg font-medium text-white">HTML</h3>
              <p class="text-sm text-gray-400">Web Structure</p>
            </div>
          </button>

          <button
            @click="selectedLanguage = 'css'"
            class="bg-gray-800 rounded-lg shadow-lg p-6 border-2 transition-all"
            :class="selectedLanguage === 'css' ? 'border-orange' : 'border-gray-700'"
          >
            <div class="text-center">
              <i class="fab fa-css3-alt text-4xl text-orange mb-2"></i>
              <h3 class="text-lg font-medium text-white">CSS</h3>
              <p class="text-sm text-gray-400">Web Styling</p>
            </div>
          </button>

          <button
            @click="selectedLanguage = 'python'"
            class="bg-gray-800 rounded-lg shadow-lg p-6 border-2 transition-all"
            :class="selectedLanguage === 'python' ? 'border-orange' : 'border-gray-700'"
          >
            <div class="text-center">
              <i class="fab fa-python text-4xl text-orange mb-2"></i>
              <h3 class="text-lg font-medium text-white">Python</h3>
              <p class="text-sm text-gray-400">Programming</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Learning Paths -->
      <div class="mb-8" v-if="selectedLanguage">
        <h2 class="text-xl font-semibold text-white mb-4">Your Learning Path</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Beginner Level -->
          <div class="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-white">Beginner</h3>
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full bg-green-900 text-green-300"
              >
                {{ getProgress('beginner') }}%
              </span>
            </div>
            <p class="text-sm text-gray-400 mb-4">
              {{ getLevelDescription('beginner') }}
            </p>
            <div class="space-y-2">
              <div
                v-for="lesson in getLessons('beginner')"
                :key="lesson.id"
                class="flex items-center"
              >
                <input
                  type="checkbox"
                  :checked="lesson.completed"
                  disabled
                  class="h-4 w-4 text-orange focus:ring-orange border-gray-600 rounded bg-gray-700"
                />
                <span
                  class="ml-2 text-sm text-gray-300"
                  :class="{ 'text-gray-500': lesson.completed }"
                >
                  {{ lesson.title }}
                </span>
              </div>
            </div>
            <button
              @click="startLevel('beginner')"
              class="mt-4 w-full bg-orange text-white px-4 py-2 rounded-md hover:bg-gold transition-colors"
            >
              Continue Learning
            </button>
          </div>

          <!-- Intermediate Level -->
          <div class="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-white">Intermediate</h3>
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-900 text-yellow-300"
              >
                {{ getProgress('intermediate') }}%
              </span>
            </div>
            <p class="text-sm text-gray-400 mb-4">
              {{ getLevelDescription('intermediate') }}
            </p>
            <div class="space-y-2">
              <div
                v-for="lesson in getLessons('intermediate')"
                :key="lesson.id"
                class="flex items-center"
              >
                <input
                  type="checkbox"
                  :checked="lesson.completed"
                  disabled
                  class="h-4 w-4 text-orange focus:ring-orange border-gray-600 rounded bg-gray-700"
                />
                <span
                  class="ml-2 text-sm text-gray-300"
                  :class="{ 'text-gray-500': lesson.completed }"
                >
                  {{ lesson.title }}
                </span>
              </div>
            </div>
            <button
              @click="startLevel('intermediate')"
              :disabled="!canAccessLevel('intermediate')"
              class="mt-4 w-full bg-orange text-white px-4 py-2 rounded-md hover:bg-gold transition-colors disabled:opacity-50"
            >
              {{ canAccessLevel('intermediate') ? 'Continue Learning' : 'Complete Beginner First' }}
            </button>
          </div>

          <!-- Expert Level -->
          <div class="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-white">Expert</h3>
              <span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-900 text-red-300">
                {{ getProgress('expert') }}%
              </span>
            </div>
            <p class="text-sm text-gray-400 mb-4">
              {{ getLevelDescription('expert') }}
            </p>
            <div class="space-y-2">
              <div
                v-for="lesson in getLessons('expert')"
                :key="lesson.id"
                class="flex items-center"
              >
                <input
                  type="checkbox"
                  :checked="lesson.completed"
                  disabled
                  class="h-4 w-4 text-orange focus:ring-orange border-gray-600 rounded bg-gray-700"
                />
                <span
                  class="ml-2 text-sm text-gray-300"
                  :class="{ 'text-gray-500': lesson.completed }"
                >
                  {{ lesson.title }}
                </span>
              </div>
            </div>
            <button
              @click="startLevel('expert')"
              :disabled="!canAccessLevel('expert')"
              class="mt-4 w-full bg-orange text-white px-4 py-2 rounded-md hover:bg-gold transition-colors disabled:opacity-50"
            >
              {{ canAccessLevel('expert') ? 'Continue Learning' : 'Complete Intermediate First' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Navigation -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <router-link
          to="/practice"
          class="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-700"
        >
          <div class="text-center">
            <i class="fas fa-code text-3xl text-orange mb-2"></i>
            <h3 class="text-lg font-medium text-white">Practice</h3>
            <p class="text-sm text-gray-400">Hands-on coding challenges</p>
          </div>
        </router-link>

        <router-link
          to="/quiz"
          class="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-700"
        >
          <div class="text-center">
            <i class="fas fa-question-circle text-3xl text-orange mb-2"></i>
            <h3 class="text-lg font-medium text-white">Quiz</h3>
            <p class="text-sm text-gray-400">Test your knowledge</p>
          </div>
        </router-link>

        <router-link
          to="/projects"
          class="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-700"
        >
          <div class="text-center">
            <i class="fas fa-project-diagram text-3xl text-orange mb-2"></i>
            <h3 class="text-lg font-medium text-white">Projects</h3>
            <p class="text-sm text-gray-400">Build real-world applications</p>
          </div>
        </router-link>

        <router-link
          to="/leaderboard"
          class="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-700"
        >
          <div class="text-center">
            <i class="fas fa-trophy text-3xl text-orange mb-2"></i>
            <h3 class="text-lg font-medium text-white">Leaderboard</h3>
            <p class="text-sm text-gray-400">Compete with other learners</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const selectedLanguage = ref('html')

// Lesson data for each language
const lessons = {
  html: {
    beginner: [
      { id: 1, title: 'Introduction to HTML', completed: true },
      { id: 2, title: 'Basic HTML Structure', completed: true },
      { id: 3, title: 'Text Formatting', completed: false },
      { id: 4, title: 'Links and Images', completed: false },
      { id: 5, title: 'Lists and Tables', completed: false },
    ],
    intermediate: [
      { id: 6, title: 'HTML Forms', completed: false },
      { id: 7, title: 'Semantic HTML', completed: false },
      { id: 8, title: 'Accessibility Basics', completed: false },
      { id: 9, title: 'HTML Tables Advanced', completed: false },
      { id: 10, title: 'HTML Forms Advanced', completed: false },
    ],
    expert: [
      { id: 11, title: 'HTML5 APIs', completed: false },
      { id: 12, title: 'Web Storage', completed: false },
      { id: 13, title: 'Web Workers', completed: false },
      { id: 14, title: 'Performance Optimization', completed: false },
      { id: 15, title: 'Advanced HTML5 Features', completed: false },
    ],
  },
  css: {
    beginner: [
      { id: 1, title: 'Introduction to CSS', completed: false },
      { id: 2, title: 'Selectors and Properties', completed: false },
      { id: 3, title: 'Colors and Typography', completed: false },
      { id: 4, title: 'Box Model', completed: false },
      { id: 5, title: 'Layout Basics', completed: false },
    ],
    intermediate: [
      { id: 6, title: 'Flexbox Layout', completed: false },
      { id: 7, title: 'Grid Layout', completed: false },
      { id: 8, title: 'Responsive Design', completed: false },
      { id: 9, title: 'CSS Animations', completed: false },
      { id: 10, title: 'CSS Transitions', completed: false },
    ],
    expert: [
      { id: 11, title: 'CSS Variables', completed: false },
      { id: 12, title: 'CSS Preprocessors', completed: false },
      { id: 13, title: 'CSS Architecture', completed: false },
      { id: 14, title: 'Performance Optimization', completed: false },
      { id: 15, title: 'Advanced Animations', completed: false },
    ],
  },
  python: {
    beginner: [
      { id: 1, title: 'Introduction to Python', completed: false },
      { id: 2, title: 'Variables and Data Types', completed: false },
      { id: 3, title: 'Control Flow', completed: false },
      { id: 4, title: 'Functions', completed: false },
      { id: 5, title: 'Lists and Dictionaries', completed: false },
    ],
    intermediate: [
      { id: 6, title: 'Object-Oriented Programming', completed: false },
      { id: 7, title: 'File Handling', completed: false },
      { id: 8, title: 'Error Handling', completed: false },
      { id: 9, title: 'Modules and Packages', completed: false },
      { id: 10, title: 'Working with APIs', completed: false },
    ],
    expert: [
      { id: 11, title: 'Advanced OOP', completed: false },
      { id: 12, title: 'Decorators and Generators', completed: false },
      { id: 13, title: 'Testing and Debugging', completed: false },
      { id: 14, title: 'Performance Optimization', completed: false },
      { id: 15, title: 'Web Development with Python', completed: false },
    ],
  },
}

// Level descriptions
const levelDescriptions = {
  html: {
    beginner: 'Master basic HTML tags, structure, and elements',
    intermediate: 'Learn forms, tables, semantic HTML, and accessibility',
    expert: 'Master advanced HTML5 features, APIs, and optimization',
  },
  css: {
    beginner: 'Learn CSS fundamentals, selectors, and basic styling',
    intermediate: 'Master layouts, responsive design, and animations',
    expert: 'Advanced CSS techniques, architecture, and optimization',
  },
  python: {
    beginner: 'Learn Python basics, data types, and control flow',
    intermediate: 'Master OOP, file handling, and working with APIs',
    expert: 'Advanced Python concepts, testing, and web development',
  },
}

// Methods
const getLessons = (level) => {
  return lessons[selectedLanguage.value][level]
}

const getProgress = (level) => {
  const levelLessons = getLessons(level)
  const completed = levelLessons.filter((lesson) => lesson.completed).length
  return Math.round((completed / levelLessons.length) * 100)
}

const getLevelDescription = (level) => {
  return levelDescriptions[selectedLanguage.value][level]
}

const canAccessLevel = (level) => {
  if (level === 'beginner') return true
  if (level === 'intermediate') return getProgress('beginner') === 100
  if (level === 'expert') return getProgress('intermediate') === 100
  return false
}

const startLevel = (level) => {
  router.push(`/learn/${selectedLanguage.value}/${level}`)
}

// Computed properties
const completedLessons = computed(() => {
  const allLessons = [
    ...lessons[selectedLanguage.value].beginner,
    ...lessons[selectedLanguage.value].intermediate,
    ...lessons[selectedLanguage.value].expert,
  ]
  return allLessons.filter((lesson) => lesson.completed).length
})
</script>
