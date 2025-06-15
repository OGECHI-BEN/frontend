<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Leaderboard Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Leaderboard</h1>
        <p class="mt-2 text-sm text-gray-500">
          Compete with other learners and track your progress
        </p>
      </div>

      <!-- Top Performers -->
      <div class="mb-12">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Top Performers</h2>
        <div v-if="loading" class="text-center text-gray-600">Loading top performers...</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Second Place -->
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <div class="relative">
              <img
                :src="topPerformers[1]?.avatar"
                :alt="topPerformers[1]?.name"
                class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200 object-cover"
                @error="handleImageError"
              />
              <!-- <div class="absolute -top-2 -right-2 bg-gray-200 rounded-full p-2">
                <i class="fas fa-medal text-gray-400 text-2xl"></i>
              </div> -->
            </div>
            <h3 class="text-lg font-medium text-gray-900">{{ topPerformers[1]?.name || 'N/A' }}</h3>
            <p class="text-sm text-gray-500">{{ topPerformers[1]?.points || 0 }} points</p>
          </div>

          <!-- First Place -->
          <div class="bg-white rounded-lg shadow p-6 text-center transform scale-105">
            <div class="relative">
              <img
                :src="topPerformers[0]?.avatar"
                :alt="topPerformers[0]?.name"
                class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-yellow-400 object-cover"
                @error="handleImageError"
              />
              <!-- <div class="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
                <i class="fas fa-crown text-white text-2xl"></i>
              </div> -->
            </div>
            <h3 class="text-lg font-medium text-gray-900">{{ topPerformers[0]?.name || 'N/A' }}</h3>
            <p class="text-sm text-gray-500">{{ topPerformers[0]?.points || 0 }} points</p>
          </div>

          <!-- Third Place -->
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <div class="relative">
              <img
                :src="topPerformers[2]?.avatar"
                :alt="topPerformers[2]?.name"
                class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-orange object-cover"
                @error="handleImageError"
              />
              <!-- <div class="absolute -top-2 -right-2 bg-orange rounded-full p-2">
                <i class="fas fa-medal text-white text-2xl"></i>
              </div> -->
            </div>
            <h3 class="text-lg font-medium text-gray-900">{{ topPerformers[2]?.name || 'N/A' }}</h3>
            <p class="text-sm text-gray-500">{{ topPerformers[2]?.points || 0 }} points</p>
          </div>
        </div>
      </div>

      <!-- Leaderboard Table -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">Global Rankings</h2>
            <div class="flex items-center space-x-4">
              <select
                v-model="timeFilter"
                class="rounded-md border-gray-300 text-sm focus:border-orange focus:ring-orange"
              >
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
              </select>
            </div>
          </div>
        </div>
        <div class="divide-y divide-gray-200">
          <div v-if="loading" class="py-8 text-center text-gray-600">Loading leaderboard...</div>
          <div v-else-if="leaderboardData.length === 0" class="py-8 text-center text-gray-600">
            No data available.
          </div>
          <div
            v-for="(user, index) in leaderboardData"
            :key="user.id"
            class="px-6 py-4 flex items-center"
            :class="{ 'bg-orange-50': user.id === currentUserId }"
          >
            <div class="w-12 text-center">
              <span
                class="text-lg font-semibold"
                :class="{
                  'text-yellow-400': index === 0,
                  'text-gray-400': index === 1,
                  'text-orange': index === 2,
                  'text-gray-500': index > 2,
                }"
              >
                #{{ index + 1 }}
              </span>
            </div>
            <div class="flex items-center flex-1">
              <img
                :src="user.avatar"
                :alt="user.name"
                class="w-10 h-10 rounded-full mr-4 object-cover"
                @error="handleImageError"
              />
              <div>
                <h3 class="text-sm font-medium text-gray-900">{{ user.name }}</h3>
                <p class="text-sm text-gray-500">{{ user.completedLessons }} lessons completed</p>
              </div>
            </div>
            <div class="flex items-center space-x-8">
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ user.points }} points</p>
                <p class="text-xs text-gray-500">{{ user.level }}</p>
              </div>
              <div class="flex items-center space-x-2">
                <span
                  v-for="badge in user.badges"
                  :key="badge"
                  class="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center"
                >
                  <i :class="badgeIcon(badge)" class="text-orange text-xs"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1 && !loading" class="flex items-center justify-between mt-4">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ paginationStart }}</span>
              to
              <span class="font-medium">{{ paginationEnd }}</span>
              of
              <span class="font-medium">{{ totalEntries }}</span>
              results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="{
                  'bg-orange text-white': currentPage === page,
                  'bg-white text-gray-500 hover:bg-gray-50': currentPage !== page,
                }"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium"
              >
                {{ page }}
              </button>
            </nav>
          </div>
        </div>
      </div>

      <!-- Your Stats -->
      <div class="mt-12">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Your Stats</h2>
        <div v-if="loading" class="text-center text-gray-600">Loading your stats...</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-orange mb-2">{{ userStats.points }}</div>
              <p class="text-sm text-gray-500">Total Points</p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-orange mb-2">{{ userStats.rank }}</div>
              <p class="text-sm text-gray-500">Global Rank</p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-orange mb-2">
                {{ userStats.completedLessons }}
              </div>
              <p class="text-sm text-gray-500">Lessons Completed</p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-orange mb-2">{{ userStats.badges }}</div>
              <p class="text-sm text-gray-500">Badges Earned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Expose the API endpoint to the template
// Expose the API endpoint to the template (for other uses if needed)
const apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT

// Expose the STATIC endpoint to the template (for images/static files)
const staticEndpoint = import.meta.env.VITE_APP_STATIC_ENDPOINT

import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '../../stores/auth'
import axios from 'axios'

const authStore = useAuthStore()
const timeFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = 10
const totalEntries = ref(0)
const leaderboardData = ref([])
const topPerformers = ref([])
const loading = ref(true)

// Computed properties for pagination
const totalPages = computed(() => Math.ceil(totalEntries.value / itemsPerPage))
const paginationStart = computed(() => (currentPage.value - 1) * itemsPerPage + 1)
const paginationEnd = computed(() => Math.min(currentPage.value * itemsPerPage, totalEntries.value))

// Helper function to handle image loading errors
const handleImageError = (e) => {
  e.target.src = `${staticEndpoint}/default-avatar.jpg` // Updated fallback avatar path
}

// Fetch top 3 performers
const fetchTopPerformers = async () => {
  try {
    const response = await axios.get('/leaderboard', {
      params: {
        time_frame: timeFilter.value,
        per_page: 3,
        page: 1,
      },
    })
    // Transform the data to include full avatar URLs
    topPerformers.value = response.data.data.map((user) => ({
      ...user,
      avatar: user.avatar
        ? `${staticEndpoint}/avatars/${user.avatar}`
        : `${staticEndpoint}/default-avatar.jpg`,
    }))
  } catch (error) {
    console.error('Failed to fetch top performers:', error)
    topPerformers.value = [] // Ensure it's an empty array on error
  }
}

// Fetch leaderboard data
const fetchLeaderboard = async () => {
  try {
    loading.value = true
    const response = await axios.get('/leaderboard', {
      params: {
        time_frame: timeFilter.value,
        language: 'all',
        level: 'all',
        page: currentPage.value,
        per_page: itemsPerPage,
      },
    })

    // Transform the data to include full avatar URLs
    leaderboardData.value = response.data.data.map((user) => ({
      id: user.id,
      name: user.name,
      avatar: user.avatar
        ? `${staticEndpoint}/avatars/${user.avatar}`
        : `${staticEndpoint}/default-avatar.jpg`,
      points: user.points,
      level: getLevelFromPoints(user.points),
      completedLessons: user.completed_lessons,
      badges: [], // Implement badge fetching later if needed
    }))

    totalEntries.value = response.data.total
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error)
    leaderboardData.value = [] // Ensure it's an empty array on error
    totalEntries.value = 0
  } finally {
    loading.value = false
  }
}

// Fetch user stats
const fetchUserStats = async () => {
  if (!currentUserId.value) {
    userStats.value = { points: 0, rank: 0, completedLessons: 0, badges: 0 }
    return
  }
  try {
    const response = await axios.get(`/leaderboard/user-stats/${currentUserId.value}`)
    userStats.value = {
      points: response.data.points,
      rank: response.data.rank,
      completedLessons: response.data.completedLessons,
      badges: response.data.badges,
    }
  } catch (error) {
    console.error('Failed to fetch user stats:', error)
    userStats.value = { points: 0, rank: 0, completedLessons: 0, badges: 0 } // Reset on error
  }
}

const currentUserId = computed(() => authStore.user?.id)

const userStats = ref({
  points: 0,
  rank: 0,
  completedLessons: 0,
  badges: 0,
})

// Helper function to determine level based on points
const getLevelFromPoints = (points) => {
  if (points >= 3000) return 'Expert'
  if (points >= 2000) return 'Advanced'
  if (points >= 1000) return 'Intermediate'
  return 'Beginner'
}

const badgeIcon = (badge) => {
  const icons = {
    speed: 'fas fa-bolt',
    perfect: 'fas fa-star',
    streak: 'fas fa-fire',
  }
  return icons[badge] || 'fas fa-award'
}

// Pagination methods
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchLeaderboard()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchLeaderboard()
  }
}

const goToPage = (page) => {
  currentPage.value = page
  fetchLeaderboard()
}

// Watch for changes in the time filter
watch(timeFilter, () => {
  currentPage.value = 1
  fetchLeaderboard()
  fetchTopPerformers()
})

// Initialize data when component mounts
onMounted(() => {
  fetchLeaderboard()
  fetchTopPerformers()
  fetchUserStats()
})
</script>

<style scoped>
/* Add any specific styles here if needed */
</style>
