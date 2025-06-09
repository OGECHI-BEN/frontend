<template>
  <header
    class="bg-dark text-primary hover:text-orange w-full p-4 shadow-md sticky top-0 right-0 left-0"
  >
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="text-2xl font-bold text-orange hover:text-gold">
          CODE-<span class="text-orange text-2xl font-bold hover:text-gold"
            >STATION
          </span></router-link
        >

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-gold hover:text-orange">HOME</router-link>
          <router-link to="/learn" class="text-gold hover:text-orange"> LEARN </router-link>
          <router-link to="/practice" class="text-gold hover:text-orange"> PRACTICE </router-link>

          <!-- User Menu -->
          <div v-if="authStore.isAuthenticated" class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <!-- <img
                :src="authStore.userAvatar || '/default-avatar.jpg'"
                alt="User avatar"
                class="w-12 h-12 rounded-full object-cover"
                @error="handleAvatarError"
              /> -->
              <img
                :src="
                  authStore.user
                    ? `${apiEndpoint}/avatars/${authStore.user.avatar}` // Use the exposed apiEndpoint
                    : '/default-avatar.png'
                "
                alt="User Avatar"
                class="h-12 w-12 rounded-full border-2 border-orange"
              />
              <span class="text-indigo-600 font-semibold">{{ authStore.userPoints }} XP</span>
            </div>
            <button @click="handleLogout" class="text-gold hover:text-orange">LOGOUT</button>
          </div>

          <!-- Guest Menu -->
          <template v-else>
            <router-link to="/login" class="text-gold hover:text-orange">LOGIN</router-link>
            <router-link
              to="/signup"
              class="bg-orange text-white px-4 py-2 rounded-lg hover:bg-blue"
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
          to="/learn"
          class="block text-gray-600 hover:text-indigo-600"
          @click="isMobileMenuOpen = false"
        >
          Learn
        </router-link>
        <router-link
          to="/practice"
          class="block text-gray-600 hover:text-indigo-600"
          @click="isMobileMenuOpen = false"
        >
          Practice
        </router-link>

        <!-- Mobile User Menu -->
        <div v-if="authStore.isAuthenticated" class="pt-4 border-t">
          <div class="flex items-center space-x-2 mb-4">
            <img
              :src="authStore.userAvatar"
              alt="User avatar"
              class="w-8 h-8 rounded-full object-cover"
            />
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
</template>

<script setup>
// Expose the API endpoint to the template
const apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

defineOptions({
  name: 'AppHeader',
})

const router = useRouter()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>
