<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Projects Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">HTML Projects</h1>
        <p class="mt-2 text-sm text-gray-500">
          Build real-world applications and enhance your portfolio
        </p>
      </div>

      <!-- Project Categories -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <!-- Beginner Projects -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Beginner Projects</h3>
            <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Level 1
            </span>
          </div>
          <p class="text-sm text-gray-500 mb-4">Perfect for those starting their HTML journey</p>
          <ul class="space-y-2 mb-4">
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Basic HTML structure
            </li>
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Simple layouts
            </li>
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Text and images
            </li>
          </ul>
        </div>

        <!-- Intermediate Projects -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Intermediate Projects</h3>
            <span
              class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800"
            >
              Level 2
            </span>
          </div>
          <p class="text-sm text-gray-500 mb-4">
            Challenge yourself with more complex applications
          </p>
          <ul class="space-y-2 mb-4">
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Forms and validation
            </li>
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Responsive design
            </li>
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Semantic HTML
            </li>
          </ul>
        </div>

        <!-- Advanced Projects -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Advanced Projects</h3>
            <span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
              Level 3
            </span>
          </div>
          <p class="text-sm text-gray-500 mb-4">Master complex web applications</p>
          <ul class="space-y-2 mb-4">
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              HTML5 APIs
            </li>
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Performance optimization
            </li>
            <li class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Accessibility
            </li>
          </ul>
        </div>
      </div>

      <!-- Featured Projects -->
      <div class="mb-12">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Featured Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="project in featuredProjects"
            :key="project.id"
            class="bg-white rounded-lg shadow overflow-hidden"
          >
            <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover" />
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-medium text-gray-900">{{ project.title }}</h3>
                <span
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': project.level === 'beginner',
                    'bg-yellow-100 text-yellow-800': project.level === 'intermediate',
                    'bg-red-100 text-red-800': project.level === 'advanced',
                  }"
                >
                  {{ project.level }}
                </span>
              </div>
              <p class="text-sm text-gray-500 mb-4">{{ project.description }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <i class="fas fa-clock text-gray-400"></i>
                  <span class="text-sm text-gray-500">{{ project.duration }}</span>
                </div>
                <button
                  @click="startProject(project)"
                  class="px-4 py-2 bg-orange text-white rounded-md hover:bg-gold transition-colors"
                >
                  Start Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Your Projects -->
      <div>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Your Projects</h2>
        <div class="bg-white shadow rounded-lg divide-y divide-gray-200">
          <div v-for="project in userProjects" :key="project.id" class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">{{ project.title }}</h3>
                <p class="text-sm text-gray-500">Started {{ project.startDate }}</p>
              </div>
              <div class="flex items-center space-x-4">
                <span
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': project.status === 'completed',
                    'bg-yellow-100 text-yellow-800': project.status === 'in-progress',
                    'bg-gray-100 text-gray-800': project.status === 'not-started',
                  }"
                >
                  {{ project.status }}
                </span>
                <button @click="continueProject(project)" class="text-orange hover:text-gold">
                  {{ project.status === 'completed' ? 'Review' : 'Continue' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mock featured projects data
const featuredProjects = ref([
  {
    id: 1,
    title: 'Personal Portfolio',
    description: 'Create a responsive portfolio website to showcase your work',
    level: 'beginner',
    duration: '2 hours',
    image: '/images/projects/portfolio.jpg',
  },
  {
    id: 2,
    title: 'E-commerce Product Page',
    description: 'Build a product page with image gallery and shopping cart',
    level: 'intermediate',
    duration: '4 hours',
    image: '/images/projects/ecommerce.jpg',
  },
  {
    id: 3,
    title: 'Interactive Dashboard',
    description: 'Create a dashboard with data visualization and real-time updates',
    level: 'advanced',
    duration: '6 hours',
    image: '/images/projects/dashboard.jpg',
  },
])

// Mock user projects data
const userProjects = ref([
  {
    id: 1,
    title: 'Personal Portfolio',
    startDate: '2024-02-20',
    status: 'in-progress',
  },
  {
    id: 2,
    title: 'Blog Layout',
    startDate: '2024-02-18',
    status: 'completed',
  },
])

// Methods
const startProject = (project) => {
  router.push(`/projects/${project.id}`)
}

const continueProject = (project) => {
  router.push(`/projects/${project.id}`)
}
</script>
