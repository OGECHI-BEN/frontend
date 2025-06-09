<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">Your Learning Progress</h2>

    <!-- Overall Progress -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-4">Overall Progress</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-gray-700">Total Lessons Completed</span>
          <span class="text-lg font-semibold">{{ totalLessonsCompleted }}/{{ totalLessons }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-4">
          <div
            class="bg-orange h-4 rounded-full transition-all duration-500"
            :style="{ width: `${overallProgress}%` }"
          ></div>
        </div>
        <div class="text-sm text-gray-500 text-right">{{ overallProgress }}% Complete</div>
      </div>
    </div>

    <!-- Level Progress -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="level in levels" :key="level.id" class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold mb-4">{{ level.name }}</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">Lessons</span>
            <span class="text-sm font-medium"
              >{{ level.completedLessons }}/{{ level.totalLessons }}</span
            >
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-orange h-2 rounded-full transition-all duration-500"
              :style="{ width: `${level.progress}%` }"
            ></div>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">{{ level.progress }}% Complete</span>
            <span class="text-gray-500">{{ level.averageScore }}% Avg. Score</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-4">Recent Activity</h3>
      <div class="space-y-4">
        <div
          v-for="activity in recentActivity"
          :key="activity.id"
          class="flex items-center justify-between py-2 border-b last:border-0"
        >
          <div class="flex items-center space-x-4">
            <div
              class="w-2 h-2 rounded-full"
              :class="{
                'bg-green-500': activity.type === 'lesson',
                'bg-blue-500': activity.type === 'quiz',
              }"
            ></div>
            <div>
              <p class="text-gray-900">{{ activity.title }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(activity.completed_at) }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-gray-900">{{ activity.score }}%</p>
            <p class="text-sm text-gray-500">{{ activity.time_taken }} min</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Achievements -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-4">Achievements</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="achievement in achievements"
          :key="achievement.id"
          class="text-center p-4"
          :class="{ 'opacity-50': !achievement.unlocked }"
        >
          <div class="w-16 h-16 mx-auto mb-2">
            <img
              :src="achievement.icon"
              :alt="achievement.name"
              class="w-full h-full object-contain"
            />
          </div>
          <p class="text-sm font-medium text-gray-900">{{ achievement.name }}</p>
          <p class="text-xs text-gray-500">{{ achievement.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Progress data
const totalLessons = ref(0)
const totalLessonsCompleted = ref(0)
const levels = ref([
  {
    id: 'beginner',
    name: 'Beginner',
    completedLessons: 0,
    totalLessons: 5,
    progress: 0,
    averageScore: 0,
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    completedLessons: 0,
    totalLessons: 7,
    progress: 0,
    averageScore: 0,
  },
  {
    id: 'expert',
    name: 'Expert',
    completedLessons: 0,
    totalLessons: 8,
    progress: 0,
    averageScore: 0,
  },
])

// Recent activity
const recentActivity = ref([])

// Achievements
const achievements = ref([
  {
    id: 1,
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '/icons/first-steps.svg',
    unlocked: false,
  },
  {
    id: 2,
    name: 'Quick Learner',
    description: 'Complete 5 lessons',
    icon: '/icons/quick-learner.svg',
    unlocked: false,
  },
  {
    id: 3,
    name: 'Perfect Score',
    description: 'Get 100% on a quiz',
    icon: '/icons/perfect-score.svg',
    unlocked: false,
  },
  {
    id: 4,
    name: 'HTML Master',
    description: 'Complete all HTML lessons',
    icon: '/icons/html-master.svg',
    unlocked: false,
  },
])

// Computed properties
const overallProgress = computed(() => {
  if (totalLessons.value === 0) return 0
  return Math.round((totalLessonsCompleted.value / totalLessons.value) * 100)
})

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

// Fetch progress data
const fetchProgress = async () => {
  try {
    const response = await axios.get('/api/progress/html')
    const data = response.data

    // Update overall progress
    totalLessons.value = data.total_lessons
    totalLessonsCompleted.value = data.completed_lessons

    // Update level progress
    levels.value = levels.value.map((level) => ({
      ...level,
      completedLessons: data.levels[level.id].completed_lessons,
      progress: data.levels[level.id].progress,
      averageScore: data.levels[level.id].average_score,
    }))

    // Update recent activity
    recentActivity.value = data.recent_activity

    // Update achievements
    achievements.value = achievements.value.map((achievement) => ({
      ...achievement,
      unlocked: data.achievements.includes(achievement.id),
    }))
  } catch (error) {
    console.error('Failed to fetch progress:', error)
  }
}

// Initial fetch
onMounted(() => {
  fetchProgress()
})
</script>
