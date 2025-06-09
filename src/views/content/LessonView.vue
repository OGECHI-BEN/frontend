<template>
  <div class="min-h-screen bg-dark">
    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb-nav">
      <router-link :to="{ name: 'home' }" class="breadcrumb-item">Home</router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link
        :to="{ name: 'learn-level', params: { language, level } }"
        class="breadcrumb-item"
      >
        {{ language }} - {{ level }}
      </router-link>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item current">{{ lesson?.title }}</span>
    </nav>

    <!-- Lesson Header -->
    <div class="bg-white shadow">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ lesson?.title }}</h1>
            <p class="mt-1 text-sm text-gray-500">
              {{ lesson?.language?.name }} - {{ lesson?.level?.name }}
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Display Estimated Time -->
            <div class="text-sm text-gray-500">
              Estimated time: {{ lesson?.estimated_time }} minutes
            </div>
            <button
              v-if="!isCompleted"
              @click="markAsComplete"
              class="px-4 py-2 bg-orange text-white rounded-lg hover:bg-gold transition-colors"
              :disabled="loading"
            >
              {{ loading ? 'Completing...' : 'Mark as Complete' }}
            </button>
            <div v-else class="text-green-500"><i class="fas fa-check-circle"></i> Completed</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div v-if="loading" class="text-white text-center py-12">Loading lesson content...</div>
      <div v-else-if="error" class="text-red-500 text-center py-12">Error: {{ error }}</div>
      <div v-else-if="lesson">
        <!-- Render Lesson Content Sections -->
        <div class="prose max-w-none text-gray-200">
          <!-- Added v-if to check for content and sections before looping -->
          <div v-if="lesson.content && lesson.content.sections">
            <div v-for="(section, index) in lesson.content.sections" :key="index" class="mb-6">
              <h2 class="text-2xl font-bold text-white mb-2">{{ section.title }}</h2>
              <div v-html="section.content"></div>
              <pre
                v-if="section.codeExample"
                class="bg-gray-800 p-4 rounded-lg overflow-x-auto mt-4"
              ><code class="language-html text-orange-light">{{ section.codeExample }}</code></pre>
              <ul v-if="section.items" class="list-disc list-inside text-gray-400">
                <li v-for="(item, itemIndex) in section.items" :key="itemIndex" class="mb-1">
                  <code>{{ item.code }}</code> - {{ item.description }}
                </li>
              </ul>
            </div>
          </div>
          <div v-else class="text-gray-400 py-4">
            Lesson content structure not available or loaded.
          </div>
        </div>

        <!-- Practice Exercises Section -->
        <h2 class="text-2xl font-bold text-white mt-12 mb-4">Practice Exercises</h2>
        <div v-if="lesson.exercises && lesson.exercises.length > 0">
          <div
            v-for="exercise in lesson.exercises"
            :key="exercise.id"
            class="bg-gray-800 p-6 rounded-lg shadow-lg mb-4"
          >
            <h3 class="text-xl font-semibold text-white mb-2">{{ exercise.title }}</h3>
            <p class="text-gray-400 mb-4">{{ exercise.description }}</p>
            <p class="text-sm text-gray-500">Points: {{ exercise.points }}</p>
            <!-- Here you would integrate your CodeEditor.vue component -->
            <!-- Example: <CodeEditor :starterCode="exercise.starter_code" :exerciseId="exercise.id" /> -->
          </div>
        </div>
        <div v-else class="text-gray-400 py-4">No practice exercises for this lesson.</div>

        <!-- Quiz Questions Section -->
        <h2 class="text-2xl font-bold text-white mt-12 mb-4">Quiz Questions</h2>
        <div v-if="lesson.questions && lesson.questions.length > 0">
          <div
            v-for="question in lesson.questions"
            :key="question.id"
            class="bg-gray-800 p-6 rounded-lg shadow-lg mb-4"
          >
            <h3 class="text-xl font-semibold text-white mb-2">{{ question.question_text }}</h3>
            <div v-if="question.type === 'multiple-choice'" class="space-y-2">
              <div
                v-for="(option, index) in question.options"
                :key="index"
                class="flex items-center text-gray-300"
              >
                <input
                  type="radio"
                  :id="`option-${question.id}-${index}`"
                  :name="`question-${question.id}`"
                  disabled
                  class="h-4 w-4 text-orange focus:ring-orange border-gray-600 rounded bg-gray-700"
                />
                <label :for="`option-${question.id}-${index}`" class="ml-2">{{ option }}</label>
              </div>
            </div>
            <div v-else-if="question.type === 'code'" class="mt-4">
              <p class="text-gray-400">Code question. (You would add a code input area here)</p>
              <!-- Example: <textarea class="w-full h-32 bg-gray-700 text-white p-2 rounded-md" disabled>{{ question.correct_answer }}</textarea> -->
            </div>
            <p class="text-sm text-gray-500 mt-4">Points: {{ question.points }}</p>
          </div>
        </div>
        <div v-else class="text-gray-400 py-4">No quiz questions for this lesson.</div>

        <!-- Navigation Buttons (Next/Previous Lesson, if available in your LessonResource) -->
        <!-- You can add navigation links here if your LessonResource returns `navigation` data -->
      </div>
      <div v-else class="text-gray-400 text-center py-12">Lesson data could not be loaded.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentStore } from '@/stores/content'

defineOptions({
  name: 'LessonView',
})

const route = useRoute()
const router = useRouter()
const contentStore = useContentStore()

const language = computed(() => route.params.language)
const level = computed(() => route.params.level)
const lessonSlug = computed(() => route.params.lesson)

const lesson = computed(() => contentStore.currentLesson)
const loading = computed(() => contentStore.loading)
const error = computed(() => contentStore.error)

const isCompleted = ref(false)
const courseProgress = ref(0)
const isRunningTests = ref(false)

const fetchLessonData = async () => {
  await contentStore.fetchLesson(language.value, level.value, lessonSlug.value)
}

onMounted(fetchLessonData)

watch(
  () => [route.params.language, route.params.level, route.params.lesson],
  () => {
    fetchLessonData()
  },
)

const markAsComplete = async () => {
  if (lesson.value && !isCompleted.value) {
    console.log(`Marking lesson "${lesson.value.title}" as complete!`)
    isCompleted.value = true
  }
}

const runTests = () => {
  isRunningTests.value = true
  setTimeout(() => {
    isRunningTests.value = false
  }, 2000)
}

const submitQuiz = () => {
  console.log('Submitting quiz!')
}
</script>

<style scoped>
.breadcrumb-nav {
  @apply bg-gray-800 p-4 text-gray-400 text-sm flex items-center;
}
.breadcrumb-item {
  @apply text-orange hover:text-gold;
}
.breadcrumb-separator {
  @apply mx-2;
}
.breadcrumb-item.current {
  @apply text-white;
}
/* Styles for the Prose content */
.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  @apply text-white;
}
.prose p {
  @apply text-gray-300;
}
.prose ul,
.prose ol {
  @apply text-gray-300;
}
.prose code {
  @apply bg-gray-700 text-orange-light px-1 py-0.5 rounded;
}
</style>
