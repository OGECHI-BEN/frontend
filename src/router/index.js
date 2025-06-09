import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LessonView from '../views/content/LessonView.vue'

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
      path: '/learn/:language/:level',
      name: 'learn-level',
      component: () => import('../views/content/LessonListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/learn/:language/:level/:lesson',
      name: 'learn-lesson',
      component: LessonView,
      meta: { requiresAuth: true },
    },
    {
      path: '/practice',
      name: 'practice',
      component: () => import('../views/PracticeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/practice/:level',
      name: 'practice-level',
      component: () => import('../views/practice/PracticeLevelView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/quiz/QuizView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/quiz/:level',
      name: 'quiz-level',
      component: () => import('../views/quiz/QuizLevelView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/projects/ProjectsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('../views/leaderboard/LeaderboardView.vue'),
      meta: { requiresAuth: true },
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
