import logo from '../assets/vue.svg'
export interface LayoutType {
  id: string
  key: 'mix' | 'side' | 'top'
  title: string
  inverted?: boolean
  dark?: boolean
}
export interface layoutTheme {
  title: string
  logo?: string
  layout: 'mix' | 'side' | 'top'
  layoutStyle: 'inverted' | 'light' | 'dark'
  headerHeight: number
  siderWidth: number
  siderCollapsedWidth: number
  showSiderTrigger: boolean | 'bar' | 'arrow-circle'
  collapsed: boolean
  theme: string
}

export const layoutThemeConfig: layoutTheme = {
  title: 'Naive Admin Pro',
  logo,
  layout: 'mix',
  layoutStyle: 'light',
  headerHeight: 48,
  siderWidth: 240,
  siderCollapsedWidth: 48,
  showSiderTrigger: 'bar',
  collapsed: false,
  theme: 'default',
}
