<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-8">
          <h2 class="text-2xl font-bold text-center mb-8">Welcome Back!</h2>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email/Username Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email or Username
              </label>
              <input
                id="email"
                v-model="form.email"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email or username"
                :disabled="authStore.loading"
              />
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                :disabled="authStore.loading"
              />
            </div>

            <!-- Error Message -->
            <div v-if="authStore.error" class="text-red-600 text-sm">
              {{ authStore.error }}
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember"
                  v-model="form.rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  :disabled="authStore.loading"
                />
                <label for="remember" class="ml-2 block text-sm text-gray-700"> Remember me </label>
              </div>
              <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="authStore.loading"
            >
              {{ authStore.loading ? 'Logging in...' : 'Log In' }}
            </button>
          </form>

          <!-- Sign Up Link -->
          <p class="mt-6 text-center text-sm text-gray-600">
            Don't have an account?
            <router-link to="/signup" class="text-indigo-600 hover:text-indigo-500 font-semibold">
              Sign up
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

const handleSubmit = async () => {
  const success = await authStore.login({
    email: form.email,
    password: form.password,
    remember: form.rememberMe,
  })

  if (success) {
    const redirectPath = route.query.redirect || '/'
    router.push(redirectPath)
  }
}
</script>
