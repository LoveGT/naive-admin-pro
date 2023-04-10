import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import '@/assets/styles/index.css'
import 'uno.css'
import { setupRouter } from './router'
import i18n from '@/locales'

async function setupApp() {
  const pinia = createPinia()
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)

  const app = createApp(App)
  app.use(pinia)

  await setupRouter(app)
  app.use(i18n)
  // mount app
  app.mount('#app')
}

setupApp()
