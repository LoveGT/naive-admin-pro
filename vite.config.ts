import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { getRootPath, getSrcPath } from './build'

export default defineConfig ((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as ImportMetaEnv
  const rootPath = getRootPath()
  const srcPath = getSrcPath()
  return {
    server: {
      proxy: {
        [viteEnv.VITE_APP_BASE_API]: {
          target: viteEnv.VITE_APP_BASE_URL,
          changeOrigin: true,
          ws: false,
          rewrite: path => path.replace(new RegExp(`^${viteEnv.VITE_APP_BASE_API}`), ''),
        },
      },
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: false,
      __VUE_I18N_LEGACY_API__: false,
    },
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
      },
    },
    plugins: [
      vue({
        reactivityTransform: true,
      }),
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          'vue-i18n',
          '@vueuse/core',
          'pinia',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
        dts: 'types/auto-imports.d.ts',
        dirs: [
          'src/stores',
          'src/composables',
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: 'types/components.d.ts',
        dirs: [
          'src/components',
        ],
      }),
      Unocss(),
    ],
  }
})
// export default defineConfig({
//   define: {
//     __VUE_I18N_FULL_INSTALL__: false,
//     __VUE_I18N_LEGACY_API__: false,
//   },
//   resolve: {
//     alias: {
//       '~': baseSrc,
//       '~@': baseSrc,
//     },
//   },
//   plugins: [
//     vue({
//       reactivityTransform: true,
//     }),
//     AutoImport({
//       imports: [
//         'vue',
//         'vue/macros',
//         'vue-router',
//         'vue-i18n',
//         '@vueuse/core',
//         'pinia',
//         {
//           'naive-ui': [
//             'useDialog',
//             'useMessage',
//             'useNotification',
//             'useLoadingBar',
//           ],
//         },
//       ],
//       dts: 'types/auto-imports.d.ts',
//       dirs: [
//         'src/stores',
//         'src/composables',
//       ],
//     }),
//     Components({
//       resolvers: [NaiveUiResolver()],
//       dts: 'types/components.d.ts',
//       dirs: [
//         'src/components',
//       ],
//     }),
//     Unocss(),
//   ],
// })
