<template>
  <div class="min-h-screen bg-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link to="/signup" class="font-medium text-orange hover:text-gold">
            create a new account
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Email/Username -->
          <div>
            <label for="email" class="text-dark">Email </label>
            <span class="sr-only">(required field, please enter a valid email address)</span>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="text"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange focus:border-orange focus:z-10 sm:text-sm"
              placeholder="Email or Username"
            />
            <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="text-dark">Password</label>
            <span class="sr-only">(required field, please enter your password)</span>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange focus:border-orange focus:z-10 sm:text-sm"
              placeholder="Password"
            />
            <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                v-model="form.remember"
                name="remember_me"
                type="checkbox"
                class="h-4 w-4 text-orange focus:ring-orange border-gray-300 rounded"
              />
              <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <!-- <div class="text-sm">
              <router-link to="/forgot-password" class="font-medium text-orange hover:text-gold">
                Forgot your password?
              </router-link>
            </div> -->
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange hover:bg-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange"
          >
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const errors = reactive({
  email: '',
  password: '',
})

const loading = ref(false)
const error = ref('')

const validateForm = () => {
  let isValid = true
  errors.email = ''
  errors.password = ''

  if (!form.email) {
    errors.email = 'Email or username is required'
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  error.value = ''

  try {
    console.log('Attempting login with:', { email: form.email, password: form.password })
    const success = await authStore.login({
      email: form.email,
      password: form.password,
      remember: form.remember,
    })
    if (success) {
      // Redirect to the originally requested page or default to home
      const redirectPath = route.query.redirect || '/learn'
      console.log('Redirecting to:', redirectPath)
      await router.push(redirectPath)
    } else {
      error.value = 'Invalid email/username or password'
    }
  } catch (err) {
    console.error('Login failed:', err)
    if (err.response?.data?.errors) {
      // Handle validation errors from the server
      const serverErrors = err.response.data.errors
      if (serverErrors.email) {
        errors.email = serverErrors.email[0]
      }
      if (serverErrors.password) {
        errors.password = serverErrors.password[0]
      }
      error.value = 'Please check your input and try again'
    } else {
      error.value = 'An error occurred. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>
