import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { layout: 'auth' },
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true, layout: 'dashboard' },
  },
  {
    path: '/users',
    name: 'user-management',
    component: () => import('@/views/user-management/UserListView.vue'),
    meta: { requiresAuth: true, layout: 'dashboard' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global guard: block any route with meta.requiresAuth until logged in.
// Also keeps a logged-in user from seeing the login page again.
router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'login' && authStore.isAuthenticated) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
