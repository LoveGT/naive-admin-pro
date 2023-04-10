/// <reference types="vite/client" />

import 'vue-router'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_BASE: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'vue-router'{
  interface RouteMeta {
    title?: string
    id?: number
    pid?: number
    icon?: string
    target?: '_blank' | '_self' | '_parent' | '_top'
  }
}
