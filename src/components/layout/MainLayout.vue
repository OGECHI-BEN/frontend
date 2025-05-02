<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header
      class="bg-dark text-primary hover:text-orange w-full p-4 shadow-md sticky top-0 right-0 left-0"
    >
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <router-link to="/" class="text-2xl font-bold text-indigo-600"> CodeStation </router-link>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link to="/" class="text-gray-600 hover:text-indigo-600">Home</router-link>
            <router-link
              v-if="authStore.isAuthenticated"
              to="/learn"
              class="text-gray-600 hover:text-indigo-600"
            >
              Learn
            </router-link>
            <router-link
              v-if="authStore.isAuthenticated"
              to="/practice"
              class="text-gray-600 hover:text-indigo-600"
            >
              Practice
            </router-link>

            <!-- User Menu -->
            <div v-if="authStore.isAuthenticated" class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <img :src="authStore.userAvatar" alt="User avatar" class="w-8 h-8 rounded-full" />
                <span class="text-indigo-600 font-semibold">{{ authStore.userPoints }} XP</span>
              </div>
              <button @click="handleLogout" class="text-gray-600 hover:text-indigo-600">
                Logout
              </button>
            </div>

            <!-- Guest Menu -->
            <template v-else>
              <router-link to="/login" class="text-gray-600 hover:text-indigo-600"
                >Login</router-link
              >
              <router-link
                to="/signup"
                class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Sign Up
              </router-link>
            </template>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden text-gray-600 hover:text-indigo-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div v-show="isMobileMenuOpen" class="md:hidden mt-4 space-y-4">
          <router-link
            to="/"
            class="block text-gray-600 hover:text-indigo-600"
            @click="isMobileMenuOpen = false"
          >
            Home
          </router-link>
          <router-link
            v-if="authStore.isAuthenticated"
            to="/learn"
            class="block text-gray-600 hover:text-indigo-600"
            @click="isMobileMenuOpen = false"
          >
            Learn
          </router-link>
          <router-link
            v-if="authStore.isAuthenticated"
            to="/practice"
            class="block text-gray-600 hover:text-indigo-600"
            @click="isMobileMenuOpen = false"
          >
            Practice
          </router-link>

          <!-- Mobile User Menu -->
          <div v-if="authStore.isAuthenticated" class="pt-4 border-t">
            <div class="flex items-center space-x-2 mb-4">
              <img :src="authStore.userAvatar" alt="User avatar" class="w-8 h-8 rounded-full" />
              <span class="text-indigo-600 font-semibold">{{ authStore.userPoints }} XP</span>
            </div>
            <button
              @click="handleLogout"
              class="block w-full text-left text-gray-600 hover:text-indigo-600"
            >
              Logout
            </button>
          </div>

          <!-- Mobile Guest Menu -->
          <template v-else>
            <router-link
              to="/login"
              class="block text-gray-600 hover:text-indigo-600"
              @click="isMobileMenuOpen = false"
            >
              Login
            </router-link>
            <router-link
              to="/signup"
              class="block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-center"
              @click="isMobileMenuOpen = false"
            >
              Sign Up
            </router-link>
          </template>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-50 border-t">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">CodeStation</h3>
            <p class="text-gray-600">Making coding fun and accessible for kids.</p>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4">LEARN</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-indigo-600">HTML</a></li>
              <li><a href="#" class="text-gray-600 hover:text-indigo-600">CSS</a></li>
              <li><a href="#" class="text-gray-600 hover:text-indigo-600">Python</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4">RESOURCES</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-indigo-600">Blog</a></li>
              <li><a href="#" class="text-gray-600 hover:text-indigo-600">Help Center</a></li>
              <li><a href="#" class="text-gray-600 hover:text-indigo-600">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4">COMPANY</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-indigo-600">About Us</a></li>
              <li><a href="#" class="text-gray-600 hover:text-indigo-600">Contact</a></li>
              <li><a href="#" class="text-gray-600 hover:text-indigo-600">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; 2024 CodeStation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>
