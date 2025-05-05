<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-8">
          <h2 class="text-2xl font-bold text-center mb-8 text-dark">Create Your Account</h2>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Username Field -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Choose a username"
                :disabled="authStore.loading"
              />
            </div>

            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
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
                placeholder="Create a password"
                :disabled="authStore.loading"
              />
            </div>

            <!-- Confirm Password Field -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirm your password"
                :disabled="authStore.loading"
              />
            </div>

            <!-- Avatar Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                Choose Your Avatar
              </label>
              <div class="grid grid-cols-4 gap-4">
                <div
                  v-for="avatar in avatars"
                  :key="avatar.id"
                  @click="selectAvatar(avatar.id)"
                  :class="[
                    'w-16 h-16 rounded-full cursor-pointer transition-transform hover:scale-110',
                    selectedAvatar === avatar.id
                      ? 'ring-4 ring-indigo-500'
                      : 'ring-2 ring-gray-200',
                  ]"
                >
                  <img
                    :src="avatar.url"
                    :alt="'Avatar ' + avatar.id"
                    class="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-center">
              <input
                id="terms"
                v-model="form.acceptTerms"
                type="checkbox"
                required
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                :disabled="authStore.loading"
              />
              <label for="terms" class="ml-2 block text-sm text-gray-700">
                I agree to the
                <a href="#" class="text-indigo-600 hover:text-indigo-500">Terms of Service</a>
                and
                <a href="#" class="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
              </label>
            </div>
            <!-- <img src="../assets/images/1.jpg" alt="" /> -->

            <!-- Error Message -->
            <div v-if="authStore.error" class="text-red-600 text-sm">
              {{ authStore.error }}
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="authStore.loading"
            >
              {{ authStore.loading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </form>

          <!-- Login Link -->
          <p class="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <router-link to="/login" class="text-indigo-600 hover:text-indigo-500 font-semibold">
              Log in
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const selectedAvatar = ref(1)

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
})

const avatars = [
  { id: 1, url: '/src/assets/images/1.jpg' },
  { id: 2, url: '/src/assets/images/2.jpg' },
  { id: 2, url: '/src/assets/images/2.avif' },
  { id: 3, url: '/src/assets/images/3.jpg' },
  { id: 3, url: '/src/assets/images/3.avif' },
  { id: 4, url: '/src/assets/images/4.avif' },
  { id: 5, url: '/src/assets/images/5.jpg' },
  { id: 6, url: '/src/assets/images/6.avif' },
  { id: 7, url: '/src/assets/images/7.jpg' },
  { id: 8, url: '/src/assets/images/8.avif' },
  { id: 9, url: '/src/assets/images/9.jpg' },
  { id: 9, url: '/src/assets/images/10.avif' },
  { id: 9, url: '/src/assets/images/11.jpg' },
  { id: 9, url: '/src/assets/images/12.avif' },
  { id: 9, url: '/src/assets/images/13.avif' },
]

const selectAvatar = (id) => {
  selectedAvatar.value = id
}

const handleSubmit = async () => {
  if (form.password !== form.confirmPassword) {
    authStore.error = 'Passwords do not match!'
    return
  }

  const success = await authStore.register({
    username: form.username,
    email: form.email,
    password: form.password,
    avatarId: selectedAvatar.value,
  })

  if (success) {
    router.push('/')
  }
}
</script>
