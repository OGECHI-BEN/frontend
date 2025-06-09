<template>
  <div class="min-h-screen bg-dark">
    <!-- Content Header -->
    <div class="bg-white shadow">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 capitalize">
              {{ language }} {{ level }} Content
            </h1>
            <p class="mt-1 text-sm text-gray-500">Learn and practice {{ language }} concepts</p>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-indigo-600 font-semibold">{{ authStore.userPoints }} XP</span>
            <div class="flex items-center space-x-2">
              <img :src="authStore.userAvatar" alt="User avatar" class="w-8 h-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-4">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Content Navigation</h2>
            <nav class="space-y-2">
              <router-link
                v-for="section in sections"
                :key="section.id"
                :to="{
                  name: 'content',
                  params: { language, level },
                  query: { section: section.id },
                }"
                class="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-orange"
                :class="{ 'bg-orange text-white hover:text-white': currentSection === section.id }"
              >
                {{ section.title }}
              </router-link>
            </nav>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-lg shadow p-6">
            <component
              :is="currentSectionComponent"
              v-if="currentSectionComponent"
              :language="language"
              :level="level"
              :section="currentSection"
            />
            <div v-else class="text-center py-12">
              <p class="text-gray-500">Select a section to begin learning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { defineAsyncComponent } from 'vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const language = computed(() => route.params.language)
const level = computed(() => route.params.level)
const currentSection = computed(() => route.query.section)

// Define sections based on language and level
const sections = computed(() => {
  const baseSections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'basics', title: 'Basic Concepts' },
    { id: 'examples', title: 'Examples' },
    { id: 'practice', title: 'Practice Exercises' },
    { id: 'quiz', title: 'Quiz' },
  ]

  // Add language-specific sections
  if (language.value === 'html') {
    return [
      ...baseSections,
      { id: 'elements', title: 'HTML Elements' },
      { id: 'attributes', title: 'HTML Attributes' },
      { id: 'forms', title: 'HTML Forms' },
    ]
  } else if (language.value === 'css') {
    return [
      ...baseSections,
      { id: 'selectors', title: 'CSS Selectors' },
      { id: 'properties', title: 'CSS Properties' },
      { id: 'layout', title: 'CSS Layout' },
    ]
  } else if (language.value === 'python') {
    return [
      ...baseSections,
      { id: 'variables', title: 'Variables & Data Types' },
      { id: 'control-flow', title: 'Control Flow' },
      { id: 'functions', title: 'Functions' },
    ]
  }

  return baseSections
})

// Dynamically load section components
const currentSectionComponent = computed(() => {
  if (!currentSection.value) return null

  try {
    return defineAsyncComponent(
      () => import(`./sections/${language.value}/${currentSection.value}.vue`),
    )
  } catch (error) {
    console.error('Failed to load section component:', error)
    return null
  }
})

// Watch for route changes to update content
watch(
  () => route.query.section,
  (newSection) => {
    if (!newSection && sections.value.length > 0) {
      // Redirect to first section if none selected
      router.replace({
        query: { ...route.query, section: sections.value[0].id },
      })
    }
  },
  { immediate: true },
)
</script>
