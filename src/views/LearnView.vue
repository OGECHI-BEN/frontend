<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Learning Paths Section -->
      <section v-if="!selectedPath" class="mb-12">
        <h2 class="text-3xl font-bold text-center mb-8">Choose Your Learning Path</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- HTML Path -->
          <div
            @click="selectPath('html')"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div class="p-6">
              <div class="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">HTML Fundamentals</h3>
              <p class="text-gray-600 mb-4">
                Learn to structure web pages and create your first website
              </p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <span class="mr-4">Beginner Friendly</span>
                <span>4-6 hours</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-indigo-600 h-2 rounded-full" style="width: 0%"></div>
              </div>
            </div>
          </div>

          <!-- CSS Path -->
          <div
            @click="selectPath('css')"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div class="p-6">
              <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.003-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">CSS Styling</h3>
              <p class="text-gray-600 mb-4">
                Make your websites beautiful with colors, layouts, and animations
              </p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <span class="mr-4">Beginner Friendly</span>
                <span>5-7 hours</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-indigo-600 h-2 rounded-full" style="width: 0%"></div>
              </div>
            </div>
          </div>

          <!-- Python Path -->
          <div
            @click="selectPath('python')"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div class="p-6">
              <div class="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Python Programming</h3>
              <p class="text-gray-600 mb-4">
                Create games, solve puzzles, and learn real programming concepts
              </p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <span class="mr-4">Beginner Friendly</span>
                <span>6-8 hours</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-indigo-600 h-2 rounded-full" style="width: 0%"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Lessons Section -->
      <section v-else>
        <div class="flex items-center mb-8">
          <button
            @click="selectedPath = null"
            class="text-indigo-600 hover:text-indigo-700 flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Paths
          </button>
        </div>

        <h2 class="text-3xl font-bold mb-8">{{ pathTitle }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="lesson in lessons"
            :key="lesson.id"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-semibold">{{ lesson.title }}</h3>
                <span class="text-sm text-indigo-600 font-semibold">{{ lesson.xp }} XP</span>
              </div>
              <p class="text-gray-600 mb-4">{{ lesson.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">{{ lesson.duration }} min</span>
                <button
                  @click="startLesson(lesson.id)"
                  class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Start Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedPath = ref(null)

const pathTitle = computed(() => {
  switch (selectedPath.value) {
    case 'html':
      return 'HTML Fundamentals'
    case 'css':
      return 'CSS Styling'
    case 'python':
      return 'Python Programming'
    default:
      return ''
  }
})

const lessons = computed(() => {
  // This would typically come from an API
  const lessonData = {
    html: [
      {
        id: 1,
        title: 'Introduction to HTML',
        description: 'Learn the basics of HTML and create your first webpage',
        xp: 100,
        duration: 30,
      },
      {
        id: 2,
        title: 'HTML Elements',
        description: 'Master common HTML elements and their usage',
        xp: 150,
        duration: 45,
      },
      {
        id: 3,
        title: 'Forms and Input',
        description: 'Create interactive forms and handle user input',
        xp: 200,
        duration: 60,
      },
    ],
    css: [
      {
        id: 1,
        title: 'CSS Basics',
        description: 'Learn how to style your HTML elements',
        xp: 100,
        duration: 30,
      },
      {
        id: 2,
        title: 'Layouts and Flexbox',
        description: 'Create responsive layouts using modern CSS',
        xp: 150,
        duration: 45,
      },
      {
        id: 3,
        title: 'Animations and Transitions',
        description: 'Add life to your websites with animations',
        xp: 200,
        duration: 60,
      },
    ],
    python: [
      {
        id: 1,
        title: 'Python Basics',
        description: 'Learn Python syntax and basic concepts',
        xp: 100,
        duration: 30,
      },
      {
        id: 2,
        title: 'Variables and Data Types',
        description: 'Work with different types of data in Python',
        xp: 150,
        duration: 45,
      },
      {
        id: 3,
        title: 'Control Flow',
        description: 'Use loops and conditionals in your programs',
        xp: 200,
        duration: 60,
      },
    ],
  }

  return selectedPath.value ? lessonData[selectedPath.value] : []
})

const selectPath = (path) => {
  selectedPath.value = path
}

const startLesson = (lessonId) => {
  // TODO: Implement lesson navigation
  console.log('Starting lesson:', lessonId)
}
</script>
