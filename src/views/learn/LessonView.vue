<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid md:grid-cols-4 gap-8">
      <!-- Main Content -->
      <div class="md:col-span-3">
        <!-- Lesson Header -->
        <div class="bg-tertiary rounded-lg p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h1 class="text-3xl font-bold text-gold">{{ lesson?.title }}</h1>
            <div class="flex items-center space-x-4">
              <span class="text-primary">{{ lesson?.duration }} min</span>
              <button
                @click="markAsComplete"
                class="bg-orange text-white px-4 py-2 rounded-lg hover:bg-gold transition-colors"
                :disabled="isCompleted"
              >
                {{ isCompleted ? 'Completed' : 'Mark as Complete' }}
              </button>
            </div>
          </div>
          <div class="prose prose-invert max-w-none">
            <div v-html="lesson?.content"></div>
          </div>
        </div>

        <!-- Code Editor Section -->
        <div v-if="lesson?.exercises?.length" class="space-y-6">
          <div
            v-for="(exercise, index) in lesson.exercises"
            :key="exercise.id"
            class="bg-tertiary rounded-lg p-6"
          >
            <h2 class="text-xl font-bold text-gold mb-4">
              Exercise {{ index + 1 }}: {{ exercise.title }}
            </h2>
            <p class="text-primary mb-4">{{ exercise.description }}</p>

            <CodeEditor
              v-model="exercise.code"
              :language="getLanguageForCourse(courseSlug)"
              :height="300"
              class="mb-4"
            />

            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <button
                  @click="runTests(exercise)"
                  class="bg-orange text-white px-4 py-2 rounded-lg hover:bg-gold transition-colors"
                  :disabled="isRunningTests"
                >
                  {{ isRunningTests ? 'Running Tests...' : 'Run Tests' }}
                </button>
                <button
                  @click="resetExercise(exercise)"
                  class="text-primary hover:text-orange transition-colors"
                >
                  Reset Code
                </button>
              </div>
              <div class="text-primary">Points: {{ exercise.points }}</div>
            </div>

            <!-- Test Results -->
            <div v-if="exercise.testResults" class="mt-4">
              <div
                class="p-4 rounded-lg"
                :class="exercise.testResults.passed ? 'bg-green-900' : 'bg-red-900'"
              >
                <h3 class="text-lg font-semibold mb-2">
                  {{ exercise.testResults.passed ? 'Tests Passed!' : 'Tests Failed' }}
                </h3>
                <div class="space-y-2">
                  <div
                    v-for="(result, index) in exercise.testResults.results"
                    :key="index"
                    class="flex items-center space-x-2"
                  >
                    <i
                      :class="
                        result.passed ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500'
                      "
                    ></i>
                    <span class="text-primary">{{ result.message }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Progress -->
        <div class="bg-tertiary rounded-lg p-6">
          <h2 class="text-xl font-bold text-gold mb-4">Your Progress</h2>
          <div class="space-y-4">
            <div class="flex justify-between text-primary">
              <span>Course Progress</span>
              <span>{{ courseProgress }}%</span>
            </div>
            <div class="w-full bg-secondary rounded-full h-2">
              <div
                class="bg-orange h-2 rounded-full transition-all duration-300"
                :style="{ width: `${courseProgress}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="bg-tertiary rounded-lg p-6">
          <h2 class="text-xl font-bold text-gold mb-4">Course Navigation</h2>
          <div class="space-y-2">
            <div v-for="module in course?.modules" :key="module.id" class="space-y-2">
              <h3 class="text-lg font-semibold text-orange">{{ module.title }}</h3>
              <div class="space-y-1">
                <router-link
                  v-for="lesson in module.lessons"
                  :key="lesson.id"
                  :to="`/learn/${courseSlug}/lessons/${lesson.id}`"
                  class="block p-2 rounded-lg transition-colors"
                  :class="{
                    'bg-orange text-white': currentLessonId === lesson.id,
                    'text-primary hover:bg-secondary': currentLessonId !== lesson.id,
                  }"
                >
                  {{ lesson.title }}
                </router-link>
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
import { useRoute, useRouter } from 'vue-router'
import CodeEditor from '../../components/learn/CodeEditor.vue'
import axios from 'axios'

defineOptions({
  name: 'LessonView',
})

const route = useRoute()
const router = useRouter()
const courseSlug = computed(() => route.params.slug)
const currentLessonId = computed(() => parseInt(route.params.lessonId))

const lesson = ref(null)
const course = ref(null)
const isRunningTests = ref(false)
const isCompleted = ref(false)
const courseProgress = ref(0)

// Mock data - Replace with API calls
const mockLesson = {
  id: 1,
  title: 'Introduction to HTML',
  content: `
    <h2>What is HTML?</h2>
    <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages.</p>
    <h3>Key Points:</h3>
    <ul>
      <li>HTML describes the structure of a web page</li>
      <li>HTML consists of a series of elements</li>
      <li>HTML elements tell the browser how to display the content</li>
    </ul>
  `,
  duration: 15,
  exercises: [
    {
      id: 1,
      title: 'Create Your First HTML Page',
      description: 'Create a basic HTML page with a title and a paragraph.',
      code: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <!-- Write your code here -->
</body>
</html>`,
      points: 10,
      testResults: null,
    },
  ],
}

const mockCourse = {
  id: 1,
  title: 'HTML Fundamentals',
  modules: [
    {
      id: 1,
      title: 'Introduction to HTML',
      lessons: [
        { id: 1, title: 'What is HTML?' },
        { id: 2, title: 'Basic Document Structure' },
        { id: 3, title: 'Your First HTML Page' },
      ],
    },
  ],
}

onMounted(async () => {
  // Replace with actual API calls
  lesson.value = mockLesson
  course.value = mockCourse
  courseProgress.value = 25
})

const getLanguageForCourse = (slug) => {
  const languageMap = {
    'html-fundamentals': 'html',
    'css-mastery': 'css',
    'python-programming': 'python',
  }
  return languageMap[slug] || 'javascript'
}

const runTests = async (exercise) => {
  isRunningTests.value = true
  try {
    // Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    exercise.testResults = {
      passed: true,
      results: [
        { passed: true, message: 'HTML structure is valid' },
        { passed: true, message: 'Title is present' },
        { passed: true, message: 'Body contains a paragraph' },
      ],
    }
  } catch (error) {
    console.error('Error running tests:', error)
  } finally {
    isRunningTests.value = false
  }
}

const resetExercise = (exercise) => {
  exercise.code = exercise.starterCode
  exercise.testResults = null
}

const markAsComplete = async () => {
  if (isCompleted.value) return

  try {
    // Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    isCompleted.value = true
    courseProgress.value += 5
  } catch (error) {
    console.error('Error marking lesson as complete:', error)
  }
}
</script>

<style>
.prose {
  @apply text-primary;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  @apply text-gold font-bold;
}

.prose p,
.prose li {
  @apply text-primary;
}

.prose a {
  @apply text-orange hover:text-gold;
}

.prose code {
  @apply bg-secondary px-2 py-1 rounded;
}

.prose pre {
  @apply bg-secondary p-4 rounded-lg overflow-x-auto;
}
</style>
