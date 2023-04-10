import { defaultLocale, loadLanguageAsync } from '@/locales'

export const useAppLocale = createGlobalState(() =>
  useStorage('locale', defaultLocale),
)

export const useAutoLang = () => {
  const appLocale = useAppLocale()
  const { locale, getLocaleMessage } = useI18n()
  const setLanguage = async (lang: string) => {
    try {
      await loadLanguageAsync(lang)
      appLocale.value = lang
      locale.value = lang
    }
    catch (error) {}
  }
  // 跟随系统切换语言
  const { isSupported, language } = useNavigatorLanguage()
  if (isSupported.value) {
    if (language.value && language.value !== defaultLocale)
      setLanguage(language.value).then(() => {})

    watch(language, (lang) => {
      if (lang)
        setLanguage(lang).then(() => {})
    })
  }

  watch(appLocale, (lang) => {
    if (lang && lang !== locale.value)
      setLanguage(lang).then(() => {})
  })
  // 初始化语言设置
  setLanguage(appLocale.value)
  const naiveLocale = computed(
    () => getLocaleMessage(appLocale.value).naiveUI || {},
  )

  return { naiveLocale }
}
