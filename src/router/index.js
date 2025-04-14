import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Practice from '../views/Practice.vue'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Learn from '../views/Learn.vue'
// import Signup from '@/views/Signup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // component: HomeView,
    },
    {
      path: '/learn',
      name: 'learn',
      component: Learn,
      // component: HomeView,
    },
    {
      path: '/practice',
      name: 'practice',
      component: Practice,
      // component: HomeView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      // component: HomeView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
