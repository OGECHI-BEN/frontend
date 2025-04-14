<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <div>im</div>
    <div>
      <h2 class="text-2xl font-bold mb-6 text-center text-dark">Sign Up/Register</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">username</label>
          <input
            type="text"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="text"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="email"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="password"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      <button
        type="button"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Sign in
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const email = ref('')
const password = ref('')

const handleLogin = () => {
  // Add your login logic here
}
</script>
