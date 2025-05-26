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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Second Place -->
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <div class="relative">
              <img
                src="/images/avatars/user2.jpg"
                alt="Second Place"
                class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200"
              />
              <div class="absolute -top-2 -right-2 bg-gray-200 rounded-full p-2">
                <i class="fas fa-medal text-gray-400 text-2xl"></i>
              </div>
            </div>
            <h3 class="text-lg font-medium text-gray-900">Sarah Johnson</h3>
            <p class="text-sm text-gray-500">2,450 points</p>
          </div>

          <!-- First Place -->
          <div class="bg-white rounded-lg shadow p-6 text-center transform scale-105">
            <div class="relative">
              <img
                src="/images/avatars/user1.jpg"
                alt="First Place"
                class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-yellow-400"
              />
              <div class="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
                <i class="fas fa-crown text-white text-2xl"></i>
              </div>
            </div>
            <h3 class="text-lg font-medium text-gray-900">John Smith</h3>
            <p class="text-sm text-gray-500">3,200 points</p>
          </div>

          <!-- Third Place -->
          <div class="bg-white rounded-lg shadow p-6 text-center">
            <div class="relative">
              <img
                src="/images/avatars/user3.jpg"
                alt="Third Place"
                class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-orange"
              />
              <div class="absolute -top-2 -right-2 bg-orange rounded-full p-2">
                <i class="fas fa-medal text-white text-2xl"></i>
              </div>
            </div>
            <h3 class="text-lg font-medium text-gray-900">Mike Wilson</h3>
            <p class="text-sm text-gray-500">2,100 points</p>
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
              <img :src="user.avatar" :alt="user.name" class="w-10 h-10 rounded-full mr-4" />
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

      <!-- Your Stats -->
      <div class="mt-12">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Your Stats</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
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
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const timeFilter = ref('all')

// Mock data - Replace with API calls
const leaderboardData = ref([
  {
    id: 1,
    name: 'John Smith',
    avatar: '/images/avatars/user1.jpg',
    points: 3200,
    level: 'Expert',
    completedLessons: 45,
    badges: ['speed', 'perfect', 'streak'],
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: '/images/avatars/user2.jpg',
    points: 2450,
    level: 'Advanced',
    completedLessons: 38,
    badges: ['perfect', 'streak'],
  },
  {
    id: 3,
    name: 'Mike Wilson',
    avatar: '/images/avatars/user3.jpg',
    points: 2100,
    level: 'Intermediate',
    completedLessons: 32,
    badges: ['streak'],
  },
  // Add more users...
])

const currentUserId = computed(() => authStore.user?.id)

const userStats = ref({
  points: 1850,
  rank: 4,
  completedLessons: 28,
  badges: 3,
})

const badgeIcon = (badge) => {
  const icons = {
    speed: 'fas fa-bolt',
    perfect: 'fas fa-star',
    streak: 'fas fa-fire',
  }
  return icons[badge] || 'fas fa-award'
}
</script>
