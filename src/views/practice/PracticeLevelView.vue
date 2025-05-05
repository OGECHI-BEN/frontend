<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 capitalize">
              {{ language }} {{ level }} Challenges
            </h1>
            <p class="text-gray-600 mt-2">
              Test your {{ language }} skills with {{ level }} level challenges
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <p class="text-sm text-gray-600">Your Level</p>
              <p class="text-xl font-semibold text-indigo-600">
                {{ userLevels[language] }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">Total Points</p>
              <p class="text-xl font-semibold text-indigo-600">
                {{ totalPoints }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Challenge Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="challenge in challenges"
          :key="challenge.id"
          class="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold">{{ challenge.title }}</h3>
              <span
                class="px-3 py-1 rounded-full text-sm font-semibold"
                :class="{
                  'bg-green-100 text-green-800': challenge.difficulty === 'beginner',
                  'bg-yellow-100 text-yellow-800': challenge.difficulty === 'intermediate',
                  'bg-red-100 text-red-800': challenge.difficulty === 'expert',
                }"
              >
                {{ challenge.difficulty }}
              </span>
            </div>
            <p class="text-gray-600 mb-4">{{ challenge.description }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <span class="text-sm text-indigo-600 font-semibold"
                  >{{ challenge.points }} Points</span
                >
                <span class="text-sm text-gray-500">{{ challenge.duration }} min</span>
              </div>
              <button
                @click="startChallenge(challenge)"
                class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Start Challenge
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Challenge Modal -->
      <div
        v-if="selectedChallenge"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold">{{ selectedChallenge.title }}</h2>
              <button @click="selectedChallenge = null" class="text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Instructions -->
              <div>
                <h3 class="text-lg font-semibold mb-4">Instructions</h3>
                <div class="prose max-w-none">
                  <p>{{ selectedChallenge.instructions }}</p>
                </div>
              </div>

              <!-- Code Editor -->
              <div>
                <h3 class="text-lg font-semibold mb-4">Your Solution</h3>
                <div class="border rounded-lg overflow-hidden">
                  <textarea
                    v-model="solution"
                    class="w-full h-64 p-4 font-mono text-sm focus:outline-none"
                    placeholder="Write your code here..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="mt-6 flex justify-end space-x-4">
              <button
                @click="selectedChallenge = null"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                @click="submitSolution"
                class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                :disabled="!solution"
              >
                Submit Solution
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
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const language = computed(() => route.params.language)
const level = computed(() => route.params.level)
const userLevels = computed(() => authStore.userLevels)
const totalPoints = computed(() => authStore.totalPoints)

const challenges = ref([])
const selectedChallenge = ref(null)
const solution = ref('')

// Mock challenges - Replace with actual API call
onMounted(async () => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    challenges.value = [
      {
        id: 1,
        title: 'Create a Responsive Layout',
        description: 'Build a responsive layout using HTML and CSS',
        difficulty: level.value,
        points: 100,
        duration: 30,
        instructions: 'Create a responsive layout that adapts to different screen sizes...',
      },
      {
        id: 2,
        title: 'Implement Form Validation',
        description: 'Add client-side validation to a form',
        difficulty: level.value,
        points: 150,
        duration: 45,
        instructions: 'Implement form validation using JavaScript...',
      },
    ]
  } catch (error) {
    console.error('Failed to load challenges:', error)
  }
})

const startChallenge = (challenge) => {
  selectedChallenge.value = challenge
  solution.value = ''
}

const submitSolution = async () => {
  if (!selectedChallenge.value || !solution.value) return

  try {
    // TODO: Implement actual API call to submit solution
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful submission
    const points = Math.round(Math.random() * selectedChallenge.value.points)
    await authStore.updateUserProgress(language.value, level.value, points)

    selectedChallenge.value = null
    solution.value = ''
  } catch (error) {
    console.error('Failed to submit solution:', error)
  }
}
</script>
