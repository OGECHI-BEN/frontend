<template>
  <div class="container mx-auto px-4 py-8">
    <!-- User Dashboard Section -->
    <section class="mb-12 bg-tertiary p-6 rounded-lg">
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-secondary p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-orange mb-2">Learning Streak</h3>
          <p class="text-2xl font-bold text-primary">{{ userStats.streak }} days</p>
        </div>
        <div class="bg-secondary p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-orange mb-2">Total Points</h3>
          <p class="text-2xl font-bold text-primary">{{ userStats.points }}</p>
        </div>
        <div class="bg-secondary p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-orange mb-2">Courses Started</h3>
          <p class="text-2xl font-bold text-primary">{{ userStats.coursesStarted }}</p>
        </div>
        <div class="bg-secondary p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-orange mb-2">Completed Lessons</h3>
          <p class="text-2xl font-bold text-primary">{{ userStats.completedLessons }}</p>
        </div>
      </div>
    </section>

    <!-- Course Selection Section -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold text-gold mb-8 text-center">Choose Your Learning Path</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <CourseCard v-for="course in courses" :key="course.slug" :course="course" />
      </div>
    </section>

    <!-- Recent Activity Section -->
    <section class="mb-12 bg-tertiary p-6 rounded-lg">
      <h2 class="text-2xl font-bold text-gold mb-6">Recent Activity</h2>
      <div class="space-y-4">
        <div
          v-for="activity in recentActivity"
          :key="activity.id"
          class="bg-secondary p-4 rounded-lg"
        >
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-orange">{{ activity.title }}</h3>
              <p class="text-primary">{{ activity.description }}</p>
            </div>
            <span class="text-sm text-primary">{{ activity.timeAgo }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CourseCard from '../components/learn/CourseCard.vue'

defineOptions({
  name: 'LearnView',
})

// Mock data - Replace with actual API calls
const userStats = ref({
  streak: 5,
  points: 1250,
  coursesStarted: 2,
  completedLessons: 15,
})

const courses = ref([
  {
    title: 'HTML Fundamentals',
    difficulty: 'Beginner',
    progress: 0,
    estimatedTime: 10,
    lessonsCount: 12,
    exercisesCount: 24,
    description: 'Learn the building blocks of web development with HTML5.',
    rating: 4.8,
    slug: 'html-fundamentals',
    prerequisites: [],
  },
  {
    title: 'CSS Mastery',
    difficulty: 'Intermediate',
    progress: 35,
    estimatedTime: 15,
    lessonsCount: 18,
    exercisesCount: 36,
    description: 'Master styling and layout with modern CSS techniques.',
    rating: 4.7,
    slug: 'css-mastery',
    prerequisites: ['HTML Fundamentals'],
  },
  {
    title: 'Python Programming',
    difficulty: 'Beginner',
    progress: 0,
    estimatedTime: 20,
    lessonsCount: 24,
    exercisesCount: 48,
    description: 'Start your programming journey with Python.',
    rating: 4.9,
    slug: 'python-programming',
    prerequisites: [],
  },
])

const recentActivity = ref([
  {
    id: 1,
    title: 'Completed HTML Lesson 3',
    description: 'You finished the Forms and Input Elements lesson',
    timeAgo: '2 hours ago',
  },
  {
    id: 2,
    title: 'Earned 50 Points',
    description: 'Completed the CSS Flexbox Challenge',
    timeAgo: '1 day ago',
  },
  {
    id: 3,
    title: 'Started Python Course',
    description: 'You began your Python programming journey',
    timeAgo: '2 days ago',
  },
])
</script>
