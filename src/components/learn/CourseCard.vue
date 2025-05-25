<template>
  <div
    class="bg-tertiary rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
  >
    <!-- Course Header -->
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-2xl font-bold text-orange">{{ course.title }}</h3>
        <span class="px-3 py-1 rounded-full text-sm font-semibold" :class="difficultyClass">
          {{ course.difficulty }}
        </span>
      </div>

      <!-- Progress Bar -->
      <div class="mb-4">
        <div class="flex justify-between text-sm text-primary mb-1">
          <span>Progress</span>
          <span>{{ course.progress }}%</span>
        </div>
        <div class="w-full bg-secondary rounded-full h-2">
          <div
            class="bg-orange h-2 rounded-full transition-all duration-300"
            :style="{ width: `${course.progress}%` }"
          ></div>
        </div>
      </div>

      <!-- Course Info -->
      <div class="space-y-3 text-primary">
        <div class="flex items-center">
          <i class="fas fa-clock mr-2"></i>
          <span>{{ course.estimatedTime }} hours</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-book mr-2"></i>
          <span>{{ course.lessonsCount }} lessons</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-tasks mr-2"></i>
          <span>{{ course.exercisesCount }} exercises</span>
        </div>
      </div>

      <!-- Prerequisites -->
      <div v-if="course.prerequisites?.length" class="mt-4">
        <h4 class="text-sm font-semibold text-primary mb-2">Prerequisites:</h4>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="prereq in course.prerequisites"
            :key="prereq"
            class="px-2 py-1 bg-secondary rounded-full text-xs text-primary"
          >
            {{ prereq }}
          </span>
        </div>
      </div>
    </div>

    <!-- Course Preview (shown on hover) -->
    <div class="bg-secondary p-6">
      <p class="text-primary mb-4">{{ course.description }}</p>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <i class="fas fa-star text-gold mr-1"></i>
          <span class="text-primary">{{ course.rating }}/5</span>
        </div>
        <router-link
          :to="`/learn/${course.slug}`"
          class="bg-orange text-white px-4 py-2 rounded-lg hover:bg-gold transition-colors"
        >
          Start Learning
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  course: {
    type: Object,
    required: true,
    validator: (course) => {
      return (
        course.title &&
        course.difficulty &&
        course.progress >= 0 &&
        course.progress <= 100 &&
        course.estimatedTime &&
        course.lessonsCount &&
        course.exercisesCount &&
        course.description &&
        course.rating &&
        course.slug
      )
    },
  },
})

const difficultyClass = computed(() => {
  const classes = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800',
  }
  return classes[props.course.difficulty] || classes.Beginner
})
</script>
