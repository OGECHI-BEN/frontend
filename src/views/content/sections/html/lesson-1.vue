<template>
  <div class="lesson-content">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading lesson content...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p class="error-message">{{ error }}</p>
      <button @click="fetchLesson" class="retry-button">Retry</button>
    </div>

    <template v-else>
      <div class="lesson-header">
        <h2>{{ lesson.title }}</h2>
        <div class="lesson-meta">
          <span class="level-badge">{{ lesson.level }}</span>
          <span class="time-estimate">{{ lesson.estimatedTime }} min</span>
        </div>
      </div>

      <section class="content-section">
        <h3>{{ lesson.sections[0].title }}</h3>
        <div v-html="lesson.sections[0].content"></div>

        <div class="code-example" v-if="lesson.sections[0].codeExample">
          <pre><code class="language-html">{{ lesson.sections[0].codeExample }}</code></pre>
        </div>
      </section>

      <section class="content-section">
        <h3>{{ lesson.sections[1].title }}</h3>
        <ul class="structure-list">
          <li v-for="(item, index) in lesson.sections[1].items" :key="index">
            <code>{{ item.code }}</code>
            <p>{{ item.description }}</p>
          </li>
        </ul>
      </section>

      <section class="content-section">
        <h3>Practice Exercise</h3>
        <div class="exercise">
          <p>{{ lesson.exercise.description }}</p>
          <ul>
            <li v-for="(requirement, index) in lesson.exercise.requirements" :key="index">
              {{ requirement }}
            </li>
          </ul>

          <div class="code-playground">
            <div class="editor">
              <textarea
                v-model="userCode"
                @input="updatePreview"
                placeholder="Write your HTML code here..."
              ></textarea>
            </div>
            <div class="preview">
              <iframe :srcdoc="previewCode" sandbox="allow-scripts"></iframe>
            </div>
          </div>

          <div class="exercise-actions">
            <button @click="submitExercise" class="submit-button" :disabled="isSubmitting">
              {{ isSubmitting ? 'Submitting...' : 'Submit Solution' }}
            </button>
          </div>
        </div>
      </section>

      <div class="lesson-navigation">
        <button @click="completeLesson" class="complete-button" :disabled="isCompleting">
          {{ isCompleting ? 'Marking as Complete...' : 'Mark as Complete' }}
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { lessonService, exerciseService } from '@/services/api'

const route = useRoute()
const router = useRouter()

const lesson = ref(null)
const loading = ref(true)
const error = ref(null)
const userCode = ref('')
const isSubmitting = ref(false)
const isCompleting = ref(false)

const previewCode = computed(() => userCode.value)

const fetchLesson = async () => {
  loading.value = true
  error.value = null

  try {
    const { language, level } = route.params
    const response = await lessonService.getLesson(language, level, 'lesson-1')
    lesson.value = response.data
  } catch (err) {
    error.value = 'Failed to load lesson. Please try again.'
    console.error('Error fetching lesson:', err)
  } finally {
    loading.value = false
  }
}

const updatePreview = () => {
  // Implementation of updatePreview function
}

const submitExercise = async () => {
  if (!userCode.value.trim()) return

  isSubmitting.value = true
  try {
    const response = await exerciseService.submitExercise(lesson.value.exercise.id, userCode.value)
    // Handle successful submission
    alert('Exercise submitted successfully!')
  } catch (err) {
    error.value = 'Failed to submit exercise. Please try again.'
    console.error('Error submitting exercise:', err)
  } finally {
    isSubmitting.value = false
  }
}

const completeLesson = async () => {
  isCompleting.value = true
  try {
    await lessonService.completeLesson(lesson.value.id)
    // Navigate to next lesson or show completion message
    router.push({
      name: 'content',
      params: {
        language: route.params.language,
        level: route.params.level,
      },
      query: {
        section: 'lesson-2',
      },
    })
  } catch (err) {
    error.value = 'Failed to mark lesson as complete. Please try again.'
    console.error('Error completing lesson:', err)
  } finally {
    isCompleting.value = false
  }
}

onMounted(fetchLesson)
</script>

<style scoped>
.lesson-content {
  @apply max-w-4xl mx-auto p-6;
}

.loading-state {
  @apply flex flex-col items-center justify-center min-h-[400px];
}

.spinner {
  @apply w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin mb-4;
}

.error-state {
  @apply text-center py-8;
}

.error-message {
  @apply text-red-600 mb-4;
}

.retry-button {
  @apply px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-dark transition-colors;
}

.lesson-header {
  @apply mb-8;
}

.lesson-meta {
  @apply flex items-center gap-4 mt-2;
}

.level-badge {
  @apply px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm;
}

.time-estimate {
  @apply text-gray-500 text-sm;
}

.content-section {
  @apply mb-8;
}

h2 {
  @apply text-3xl font-bold mb-6;
}

h3 {
  @apply text-2xl font-semibold mb-4;
}

p {
  @apply text-gray-700 mb-4;
}

.code-example {
  @apply bg-gray-100 rounded-lg p-4 mb-6;
}

.structure-list {
  @apply space-y-4;
}

.structure-list li {
  @apply flex items-start gap-4;
}

.structure-list code {
  @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono;
}

.exercise {
  @apply bg-blue-50 rounded-lg p-6;
}

.code-playground {
  @apply grid grid-cols-2 gap-4 mt-4;
}

.editor textarea {
  @apply w-full h-64 p-4 font-mono text-sm border rounded-lg;
}

.preview iframe {
  @apply w-full h-64 border rounded-lg bg-white;
}

.exercise-actions {
  @apply mt-6 flex justify-end;
}

.submit-button {
  @apply px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50;
}

.lesson-navigation {
  @apply mt-8 flex justify-end;
}

.complete-button {
  @apply px-6 py-2 bg-orange text-white rounded-lg hover:bg-orange-dark transition-colors disabled:opacity-50;
}
</style>
