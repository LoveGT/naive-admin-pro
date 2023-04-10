import type { RouteRecordRaw } from 'vue-router'

const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Login',
    },
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/error',
    name: 'Error',
    meta: {
      title: 'Error',
    },
    component: () => import('@/pages/exception/index.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/pages/exception/error.vue'),
  },
]

export default staticRoutes
