<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-light to-blue-dark text-white">
      <div class="container mx-auto px-4 py-20">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">Learn to Code Through Fun Adventures</h1>
          <p class="text-xl md:text-2xl mb-8">
            Join thousands of young coders on an exciting journey to master HTML, CSS, and Python
          </p>
          <router-link
            to="/signup"
            class="inline-block bg-white text-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Your Journey
          </router-link>
        </div>
      </div>
    </section>

    <!-- Learning Paths Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-dark">Choose Your Learning Path</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- HTML Path -->
          <div
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div class="p-6">
              <div class="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-dark">HTML Fundamentals</h3>
              <p class="text-dark mb-4">
                Learn to structure web pages and create your first website
              </p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <span class="mr-4">Beginner Friendly</span>
                <span>4-6 hours</span>
              </div>
              <router-link
                to="/learn"
                class="inline-block text-indigo-600 font-semibold hover:text-indigo-700"
              >
                Start Learning →
              </router-link>
            </div>
          </div>

          <!-- CSS Path -->
          <div
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div class="p-6">
              <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-blue-dark" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.003-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-dark">CSS Styling</h3>
              <p class="text-dark mb-4">
                Make your websites beautiful with colors, layouts, and animations
              </p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <span class="mr-4">Beginner Friendly</span>
                <span>5-7 hours</span>
              </div>
              <router-link
                to="/learn"
                class="inline-block text-indigo-600 font-semibold hover:text-indigo-700"
              >
                Start Learning →
              </router-link>
            </div>
          </div>

          <!-- Python Path -->
          <div
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div class="p-6">
              <div class="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24">
                  <g>
                    <!-- Python Logo - Two Intertwined Snakes -->
                    <path
                      d="M11.458,1.003c-5.072,0-4.757,2.197-4.757,2.197l0.006,2.275h4.839v0.683H4.317
                      c0,0-3.317-0.375-3.317,4.854s2.902,5.034,2.902,5.034h1.73v-2.424c0,0-0.094-2.902,2.85-2.902
                      s4.678,0,4.678,0s2.629,0.042,2.629-2.543s0-4.285,0-4.285S16.306,1.003,11.458,1.003z M8.723,2.586
                      c0.48,0,0.87,0.39,0.87,0.87s-0.39,0.87-0.87,0.87s-0.87-0.39-0.87-0.87S8.243,2.586,8.723,2.586z"
                      fill="#3776AB"
                    />
                    <path
                      d="M12.542,22.997c5.072,0,4.757-2.197,4.757-2.197l-0.006-2.275h-4.839v-0.683h7.229
                      c0,0,3.317,0.375,3.317-4.854s-2.902-5.034-2.902-5.034h-1.73v2.424c0,0,0.094,2.902-2.85,2.902
                      s-4.678,0-4.678,0s-2.629-0.042-2.629,2.543s0,4.285,0,4.285S7.694,22.997,12.542,22.997z M15.277,21.414
                      c-0.48,0-0.87-0.39-0.87-0.87s0.39-0.87,0.87-0.87s0.87,0.39,0.87,0.87S15.757,21.414,15.277,21.414z"
                      fill="#FFD43B"
                    />
                  </g>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-dark">Python Programming</h3>
              <p class="text-dark mb-4">
                Create games, solve puzzles, and learn real programming concepts
              </p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <span class="mr-4">Beginner Friendly</span>
                <span>6-8 hours</span>
              </div>
              <router-link
                to="/learn"
                class="inline-block text-indigo-600 font-semibold hover:text-indigo-700"
              >
                Start Learning →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">What Our Young Coders Say</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <span class="text-indigo-600 font-semibold">S</span>
              </div>
              <div class="ml-4">
                <h4 class="font-semibold">Sarah, 12</h4>
                <p class="text-gray-600">Python Path</p>
              </div>
            </div>
            <p class="text-gray-700">
              "I love how CodeStation makes coding fun! I've already created my first game!"
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <span class="text-indigo-600 font-semibold">M</span>
              </div>
              <div class="ml-4">
                <h4 class="font-semibold">Mike, 10</h4>
                <p class="text-gray-600">HTML & CSS Path</p>
              </div>
            </div>
            <p class="text-gray-700">
              "The lessons are easy to follow, and I can build my own websites now!"
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <span class="text-indigo-600 font-semibold">E</span>
              </div>
              <div class="ml-4">
                <h4 class="font-semibold">Emma, 11</h4>
                <p class="text-gray-600">All Paths</p>
              </div>
            </div>
            <p class="text-gray-700">
              "I love earning points and seeing my progress. It's like a game!"
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
