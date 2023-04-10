import { createI18n } from 'vue-i18n'
import zhCN from './lang/zh-CN'
export const defaultLocale = 'zh-CN'
const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  missingWarn: false,
  fallbackLocale: defaultLocale,
  messages: {
    'zh-CN': zhCN,
  },
})

// 加载语言
export const loadLanguageAsync = async (locale: string) => {
  const current = i18n.global.locale.value
  try {
    if (current === locale)
      return nextTick()

    const message = await import(`./lang/${locale}.ts`)
    if (message)
      i18n.global.setLocaleMessage(locale, message.default)
  }
  catch (error) {
    console.warn('load language error', error)
  }
  return nextTick()
}
export default i18n
