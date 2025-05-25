<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Course Header -->
    <div class="bg-tertiary rounded-lg p-8 mb-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 class="text-4xl font-bold text-gold mb-2">{{ course.title }}</h1>
          <p class="text-xl text-primary">{{ course.description }}</p>
        </div>
        <div class="flex items-center space-x-4 mt-4 md:mt-0">
          <span class="px-4 py-2 rounded-full text-sm font-semibold" :class="difficultyClass">
            {{ course.difficulty }}
          </span>
          <div class="flex items-center">
            <i class="fas fa-star text-gold mr-1"></i>
            <span class="text-primary">{{ course.rating }}/5</span>
          </div>
        </div>
      </div>

      <!-- Course Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-secondary p-4 rounded-lg">
          <div class="text-sm text-primary mb-1">Duration</div>
          <div class="text-xl font-bold text-orange">{{ course.estimatedTime }} hours</div>
        </div>
        <div class="bg-secondary p-4 rounded-lg">
          <div class="text-sm text-primary mb-1">Lessons</div>
          <div class="text-xl font-bold text-orange">{{ course.lessonsCount }}</div>
        </div>
        <div class="bg-secondary p-4 rounded-lg">
          <div class="text-sm text-primary mb-1">Exercises</div>
          <div class="text-xl font-bold text-orange">{{ course.exercisesCount }}</div>
        </div>
        <div class="bg-secondary p-4 rounded-lg">
          <div class="text-sm text-primary mb-1">Projects</div>
          <div class="text-xl font-bold text-orange">{{ course.projectsCount }}</div>
        </div>
      </div>
    </div>

    <!-- Course Content -->
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="md:col-span-2">
        <!-- What You'll Learn -->
        <section class="bg-tertiary rounded-lg p-6 mb-8">
          <h2 class="text-2xl font-bold text-gold mb-4">What You'll Learn</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(skill, index) in course.skills"
              :key="index"
              class="flex items-start space-x-3"
            >
              <i class="fas fa-check text-orange mt-1"></i>
              <span class="text-primary">{{ skill }}</span>
            </div>
          </div>
        </section>

        <!-- Curriculum -->
        <section class="bg-tertiary rounded-lg p-6">
          <h2 class="text-2xl font-bold text-gold mb-4">Curriculum</h2>
          <div class="space-y-4">
            <div
              v-for="(module, index) in course.modules"
              :key="index"
              class="bg-secondary rounded-lg p-4"
            >
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-orange">{{ module.title }}</h3>
                <span class="text-sm text-primary">{{ module.duration }} hours</span>
              </div>
              <p class="text-primary mb-3">{{ module.description }}</p>
              <div class="space-y-2">
                <div
                  v-for="(lesson, lessonIndex) in module.lessons"
                  :key="lessonIndex"
                  class="flex items-center justify-between text-sm"
                >
                  <div class="flex items-center">
                    <i class="fas fa-play-circle text-orange mr-2"></i>
                    <span class="text-primary">{{ lesson.title }}</span>
                  </div>
                  <span class="text-primary">{{ lesson.duration }} min</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Prerequisites -->
        <section class="bg-tertiary rounded-lg p-6">
          <h2 class="text-xl font-bold text-gold mb-4">Prerequisites</h2>
          <div class="space-y-3">
            <div
              v-for="(prereq, index) in course.prerequisites"
              :key="index"
              class="flex items-center space-x-3"
            >
              <i class="fas fa-check-circle text-orange"></i>
              <span class="text-primary">{{ prereq }}</span>
            </div>
          </div>
        </section>

        <!-- Start Learning Button -->
        <div class="bg-tertiary rounded-lg p-6">
          <button
            @click="startLearning"
            class="w-full bg-orange text-white py-3 rounded-lg font-semibold hover:bg-gold transition-colors"
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  course: {
    type: Object,
    required: true,
    validator: (course) => {
      return (
        course.title &&
        course.description &&
        course.difficulty &&
        course.estimatedTime &&
        course.lessonsCount &&
        course.exercisesCount &&
        course.projectsCount &&
        course.rating &&
        course.skills &&
        course.modules &&
        course.prerequisites
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

const startLearning = () => {
  router.push(`/learn/${props.course.slug}/lessons/1`)
}
</script>
