import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/layouts'
// 根路由
export const rootRouter: RouteRecordRaw = {
  path: '/',
  name: 'default-router',
  redirect: '/home',
  component: Layout,
  children: [],
}

// 动态路由
export const dynamicRoutes: RouteRecordRaw[] = [
  // {
  // path: '/',
  // name: 'index',
  // component: Layout,
  // redirect: '/home',
  // children: [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/index.vue'),
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/workspace',
    name: 'Workspace',
    component: () => import('@/pages/workspace/index.vue'),
  },
  //   ],
  // },
]
