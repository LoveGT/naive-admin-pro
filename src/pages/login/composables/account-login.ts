import type { FormInst, FormRules } from 'naive-ui'
import type { UserAccountLoginParams } from '@/apis/user'

export const useAccountLogin = () => {
  const { t } = useI18n()
  const userStore = useUserStore()
  const router = useRouter()

  const formRef = ref<FormInst>()
  const model = reactive<UserAccountLoginParams>({
    username: null,
    password: null,
    rememberMe: false,
  })
  const loading = ref(false)
  const rules = reactive<FormRules>({
    username: [
      {
        required: true,
        renderMessage: () => t('login.username.required'),
      },
      {
        max: 20,
        min: 5,
        renderMessage: () => t('login.username.length'),
      },
    ],
    password: [
      {
        required: true,
        renderMessage: () => t('login.password.required'),
      },
      {
        max: 20,
        min: 5,
        renderMessage: () => t('login.password.length'),
      },
    ],
  })

  const login = async () => {
    try {
      // 1.加载loading状态
      loading.value = true
      // 2.校验表单是否正确
      await formRef.value?.validate(() => {})
      // 3.请求接口
      await userStore.login(model)
      // 4.请求成功设置token
      loading.value = false
      // 5.跳转到首页
      const redirect = router.currentRoute.value?.params?.redirect as string
      await router.replace(redirect || '/')
      loading.value = false
    }
    catch (error) {
      loading.value = false
    }
  }
  return { formRef, model, loading, rules, login }
}
