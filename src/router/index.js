import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LessonView from '../views/learn/LessonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/learn',
      name: 'learn',
      component: () => import('../views/LearnView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/learn/:slug',
      name: 'course-overview',
      component: () => import('../views/learn/CourseOverviewView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/learn/:slug/lessons/:lessonId',
      name: 'lesson',
      component: LessonView,
      meta: {
        requiresAuth: true,
        title: 'Lesson',
      },
    },
    {
      path: '/practice',
      name: 'practice',
      component: () => import('../views/PracticeView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
    },
    // Protected Content Routes
    {
      path: '/content/:language/:level',
      name: 'content',
      component: () => import('../views/content/ContentView.vue'),
      meta: { requiresAuth: true },
    },
    // Protected Practice Routes
    {
      path: '/practice/:language/:level',
      name: 'practice-level',
      component: () => import('../views/practice/PracticeLevelView.vue'),
      meta: { requiresAuth: true },
    },
    // Admin Routes
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: 'quizzes',
          name: 'quiz-manager',
          component: () => import('../views/admin/QuizManager.vue'),
        },
      ],
    },
  ],
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // Check if route requires admin access
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next({ name: 'home' })
    return
  }

  next()
})

export default router
