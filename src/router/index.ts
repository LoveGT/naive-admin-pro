import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { createRouterGuard } from './guard'
import staticRoutes from './static-routes'
const router = createRouter({
  routes: [
    ...staticRoutes,
  ],
  history: createWebHistory(import.meta.env.VITE_APP_BASE ?? '/'),
})

export default router

export async function setupRouter(app: App) {
  app.use(router)
  createRouterGuard(router)
  await router.isReady()
}
