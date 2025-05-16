<template>
  <div class="min-h-screen bg-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link to="/login" class="font-medium text-orange hover:text-gold">
            sign in to your existing account
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Username -->
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              v-model="form.username"
              name="username"
              type="text"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange focus:border-orange focus:z-10 sm:text-sm"
              placeholder="Username"
            />
            <span v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</span>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange focus:border-orange focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
            <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="sr-only">Password</label>
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

          <!-- Confirm Password -->
          <div>
            <label for="password_confirmation" class="sr-only">Confirm Password</label>
            <input
              id="password_confirmation"
              v-model="form.password_confirmation"
              name="password_confirmation"
              type="password"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange focus:border-orange focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
            />
            <span v-if="errors.password_confirmation" class="text-red-500 text-sm">{{
              errors.password_confirmation
            }}</span>
          </div>

          <!-- Avatar Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Choose your avatar</label>
            <div class="grid grid-cols-4 gap-4">
              <div
                v-for="(avatar, index) in avatars"
                :key="index"
                @click="selectAvatar(avatar)"
                :class="[
                  'cursor-pointer rounded-full p-1 transition-all duration-200',
                  form.avatar === avatar
                    ? 'ring-2 ring-orange scale-110'
                    : 'hover:ring-2 hover:ring-gray-300',
                ]"
              >
                <img
                  :src="getAvatarUrl(avatar)"
                  :alt="`Avatar ${index + 1}`"
                  class="w-12 h-12 rounded-full object-cover"
                />
              </div>
            </div>
            <span v-if="errors.avatar" class="text-red-500 text-sm">{{ errors.avatar }}</span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange hover:bg-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange"
          >
            <span v-if="loading">Creating account...</span>
            <span v-else>Sign up</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  avatar: '',
})

const errors = reactive({
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  avatar: '',
})

const loading = ref(false)

// Avatar options - using the actual image files from assets
const avatars = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.avif',
  '5.jpg',
  '6.avif',
  '7.jpg',
  '8.avif',
  '2.avif',
  '3.avif',
  '10.avif',
  '9.jpg',
  '11.jpg',
  '12.avif',
  '13.avif',
]

// Function to get the full URL for an avatar
const getAvatarUrl = (avatar) => {
  return new URL(`../assets/images/${avatar}`, import.meta.url).href
}

// Function to handle avatar selection
const selectAvatar = (avatar) => {
  form.avatar = avatar
  errors.avatar = '' // Clear any previous avatar errors
}

const validateForm = () => {
  let isValid = true
  errors.username = ''
  errors.email = ''
  errors.password = ''
  errors.password_confirmation = ''
  errors.avatar = ''

  // Username validation
  if (form.username.length < 3) {
    errors.username = 'Username must be at least 3 characters long'
    isValid = false
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Password validation
  if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long'
    isValid = false
  }

  // Password confirmation
  if (form.password !== form.password_confirmation) {
    errors.password_confirmation = 'Passwords do not match'
    isValid = false
  }

  // Avatar validation
  if (!form.avatar) {
    errors.avatar = 'Please select an avatar'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    const success = await authStore.register(form)
    if (success) {
      router.push('/learn')
    }
  } catch (error) {
    console.error('Registration failed:', error)
  } finally {
    loading.value = false
  }
}
</script>
