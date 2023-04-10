import type { DropdownOption } from 'naive-ui'
import type { LayoutType, layoutTheme } from '@/config/layout-theme'
import { layoutThemeConfig } from '@/config/layout-theme'
import { darkTheme } from '@/config/app-theme'
import type { ThemeType } from '@/config/theme'
import { colors, darkColors } from '@/config/theme'
export const useAppStore = defineStore('app', () => {
  const defaultTheme = import.meta.env.DEV
    ? layoutThemeConfig
    : useLayoutTheme()
  const layout = reactive(unref(defaultTheme))
  const visible = ref(false)

  const toggleVisible = (val: boolean) => {
    visible.value = val
  }
  const toggleCollapsed = (val: boolean) => {
    layout.collapsed = val
  }
  // 布局逻辑
  const updateLayout = (val: LayoutType['key']) => {
    layout.layout = val
  }

  const updateLayoutStyle = (val: layoutTheme['layoutStyle']) => {
    layout.layoutStyle = val
  }

  const layoutList = computed<LayoutType[]>(() => {
    return [
      {
        id: 'side',
        key: 'side',
        title: 'global.layout.setting.drawer.layout.side',
      },
      {
        id: 'top',

        key: 'top',
        title: 'global.layout.setting.drawer.layout.top',
      },
      {
        id: 'mix',
        key: 'mix',
        title: 'global.layout.setting.drawer.layout.mix',
      },
    ]
  })
  watch(
    () => layout.layoutStyle,
    (val) => {
      if (val === 'dark') toggleDark(true)
      else toggleDark(false)
    },
  )
  // 布局风格的逻辑
  const layoutStyleList = computed<LayoutType[]>(() => {
    const list: LayoutType[] = [
      {
        id: 'light',
        key: 'side',
        title: 'global.layout.setting.drawer.style.light',
      },
    ]
    if (layout.layout !== 'mix') {
      list.push({
        id: 'inverted',
        key: 'side',
        inverted: true,
        title: 'global.layout.setting.drawer.style.inverted',
      })
    }
    else {
      if (layout.layoutStyle !== 'dark') updateLayoutStyle('light')
    }
    list.push({
      id: 'dark',
      key: 'side',
      title: 'global.layout.setting.drawer.style.dark',
      dark: true,
    })
    return list
  })
  const layoutTheme = computed(() => {
    if (layout.layoutStyle === 'dark') return darkTheme

    return undefined
  })
  // 主题色的逻辑
  const overridesTheme = computed(() => {
    // 自动引入
    if (isDark.value) return darkColors[layout.theme]
    return colors[layout.theme]
  })

  const updateTheme = (val: string) => {
    layout.theme = val
  }
  const themeList = computed<ThemeType[]>(() => {
    const list = []
    const myColors = isDark.value ? darkColors : colors
    for (const key in myColors) {
      const value = myColors[key]
      list.push({
        key,
        color: value.common?.primaryColor as string,
        title: `global.layout.setting.drawer.theme.${key}`,
      })
    }
    return list
  })
  const langOptions = ref<DropdownOption[]>([
    {
      key: 'zh-CN',
      label: '简体中文',
      icon: () => '🇨🇳',
    },
    {
      key: 'en-US',
      label: 'English',
      icon: () => '🇺🇸',
    },
  ])
  return {
    layout,
    visible,
    toggleVisible,
    toggleCollapsed,
    layoutList,
    layoutStyleList,
    updateLayout,
    updateLayoutStyle,
    layoutTheme,
    overridesTheme,
    updateTheme,
    themeList,
    langOptions,
  }
})
