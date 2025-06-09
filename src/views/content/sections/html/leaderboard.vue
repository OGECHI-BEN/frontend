<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">HTML Leaderboard</h2>
      <div class="flex items-center space-x-4">
        <select
          v-model="selectedLevel"
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
        <select
          v-model="timeFrame"
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
        >
          <option value="all">All Time</option>
          <option value="month">This Month</option>
          <option value="week">This Week</option>
        </select>
      </div>
    </div>

    <!-- Leaderboard Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Rank
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              User
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Score
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Time Taken
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Completed
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(entry, index) in leaderboardEntries"
            :key="entry.id"
            :class="{ 'bg-orange-50': entry.user_id === currentUserId }"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <span
                  class="text-sm font-medium"
                  :class="{
                    'text-orange': index === 0,
                    'text-gray-600': index === 1,
                    'text-yellow-600': index === 2,
                  }"
                >
                  #{{ index + 1 }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <img :src="entry.user_avatar" :alt="entry.user_name" class="h-8 w-8 rounded-full" />
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ entry.user_name }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ entry.score }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatTime(entry.time_taken) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ formatDate(entry.completed_at) }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between">
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const selectedLevel = ref('beginner')
const timeFrame = ref('all')
const currentPage = ref(1)
const itemsPerPage = 10
const leaderboardEntries = ref([])
const totalEntries = ref(0)
const currentUserId = ref(null) // This should be set from your auth store

// Computed properties for pagination
const totalPages = computed(() => Math.ceil(totalEntries.value / itemsPerPage))
const paginationStart = computed(() => (currentPage.value - 1) * itemsPerPage + 1)
const paginationEnd = computed(() => Math.min(currentPage.value * itemsPerPage, totalEntries.value))

// Format time in minutes and seconds
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

// Fetch leaderboard data
const fetchLeaderboard = async () => {
  try {
    const response = await axios.get('/api/leaderboard', {
      params: {
        language: 'html',
        level: selectedLevel.value,
        time_frame: timeFrame.value,
        page: currentPage.value,
        per_page: itemsPerPage,
      },
    })
    leaderboardEntries.value = response.data.data
    totalEntries.value = response.data.total
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error)
  }
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

// Watch for changes in filters
watch([selectedLevel, timeFrame], () => {
  currentPage.value = 1
  fetchLeaderboard()
})

// Initial fetch
onMounted(() => {
  fetchLeaderboard()
})

const showToast = (message, type) => {
  // Implementation of showToast function
}
</script>
