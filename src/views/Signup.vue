<template>
  <div class="p-20 rounded-lg flex flex-row align-middle">
    <div class="email-bg w-full md:mx-w-[100%] rounded-bl-lg roonded-tl-lg"></div>
    <div
      class="w-full md:max-w-[100%] mx-auto md:mx-0 p-6 bg-blue rounded-tr-lg rounded-br-lg shadow-md"
    >
      <h2 class="text-xl font-bold mb-6 text-center text-dark">Sign Up/Register</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-primary mb-2">username</label>
          <input
            type="text"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="text"
          />
        </div>
        <div class="mb-4">
          <label class="block text-primary mb-2">Email</label>
          <input
            type="email"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="email"
          />
        </div>
        <div class="mb-6">
          <label class="block text-primary mb-2">Password</label>
          <input
            type="password"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="password"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-gold hover:bg-dark text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      <p class="text-dark text-sm py-4 mb-4">Welcome back!! sign in below</p>
      <button
        type="button"
        class="w-full bg-orange hover:bg-orange-dark text-white py-2 px-4 rounded hover:bg-blue-700 transition"
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

<style scoped>
.email-bg {
  background-image: url('../assets/images/chess.jpg');
  background-size: cover;
  background-position: center center;
}
</style>
