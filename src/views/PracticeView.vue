<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Filters -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex flex-wrap gap-4">
              <!-- Difficulty Filter -->
              <div class="flex-1 min-w-[200px]">
                <label class="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  v-model="filters.difficulty"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <!-- Language Filter -->
              <div class="flex-1 min-w-[200px]">
                <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  v-model="filters.language"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Languages</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="python">Python</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Challenges Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="challenge in filteredChallenges"
              :key="challenge.id"
              class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-xl font-semibold">{{ challenge.title }}</h3>
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-sm font-semibold',
                      {
                        'bg-green-100 text-green-800': challenge.difficulty === 'beginner',
                        'bg-yellow-100 text-yellow-800': challenge.difficulty === 'intermediate',
                        'bg-red-100 text-red-800': challenge.difficulty === 'advanced',
                      },
                    ]"
                  >
                    {{ challenge.difficulty }}
                  </span>
                </div>
                <p class="text-gray-600 mb-4">{{ challenge.description }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <span class="text-sm text-indigo-600 font-semibold">{{ challenge.xp }} XP</span>
                    <span class="text-sm text-gray-500">{{ challenge.duration }} min</span>
                  </div>
                  <button
                    @click="startChallenge(challenge.id)"
                    class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Start Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Leaderboard Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-6">Top Coders</h3>
              <div class="space-y-4">
                <div v-for="(user, index) in leaderboard" :key="user.id" class="flex items-center">
                  <div
                    class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold mr-3"
                  >
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center">
                      <img :src="user.avatar" :alt="user.name" class="w-8 h-8 rounded-full mr-3" />
                      <span class="font-medium">{{ user.name }}</span>
                    </div>
                  </div>
                  <span class="text-indigo-600 font-semibold">{{ user.points }} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const filters = ref({
  difficulty: '',
  language: '',
})

// Sample challenges data (would typically come from an API)
const challenges = [
  {
    id: 1,
    title: 'Build a Simple Website',
    description: 'Create a responsive website using HTML and CSS',
    difficulty: 'beginner',
    language: 'html',
    xp: 100,
    duration: 30,
  },
  {
    id: 2,
    title: 'CSS Grid Layout',
    description: 'Master CSS Grid to create complex layouts',
    difficulty: 'intermediate',
    language: 'css',
    xp: 150,
    duration: 45,
  },
  {
    id: 3,
    title: 'Python Calculator',
    description: 'Build a calculator using Python functions',
    difficulty: 'beginner',
    language: 'python',
    xp: 100,
    duration: 30,
  },
  {
    id: 4,
    title: 'Advanced Form Validation',
    description: 'Create a form with complex validation rules',
    difficulty: 'advanced',
    language: 'html',
    xp: 200,
    duration: 60,
  },
]

// Sample leaderboard data (would typically come from an API)
const leaderboard = [
  {
    id: 1,
    name: 'Sarah',
    points: 2500,
    avatar: '/avatars/avatar1.png',
  },
  {
    id: 2,
    name: 'Mike',
    points: 2100,
    avatar: '/avatars/avatar2.png',
  },
  {
    id: 3,
    name: 'Emma',
    points: 1900,
    avatar: '/avatars/avatar3.png',
  },
  {
    id: 4,
    name: 'Alex',
    points: 1800,
    avatar: '/avatars/avatar4.png',
  },
  {
    id: 5,
    name: 'John',
    points: 1700,
    avatar: '/avatars/avatar5.png',
  },
]

const filteredChallenges = computed(() => {
  return challenges.filter((challenge) => {
    if (filters.value.difficulty && challenge.difficulty !== filters.value.difficulty) {
      return false
    }
    if (filters.value.language && challenge.language !== filters.value.language) {
      return false
    }
    return true
  })
})

const startChallenge = (challengeId) => {
  // TODO: Implement challenge navigation
  console.log('Starting challenge:', challengeId)
}
</script>
