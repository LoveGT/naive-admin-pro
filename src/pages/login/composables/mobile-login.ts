import type { FormInst, FormRules } from 'naive-ui'
import type { UserMobileLoginParams } from '@/apis/user'
import { userSendCodeApi } from '@/apis/user'

export const useMobileLogin = () => {
  const { t } = useI18n()
  const userStore = useUserStore()
  const router = useRouter()
  const time = ref(120)
  const timeState = ref(false)
  const mFormRef = ref<FormInst>()
  const mModel = reactive<UserMobileLoginParams>({
    mobile: null,
    code: null,
    type: 'mobile',
    rememberMe: false,
  })
  const mLoading = ref(false)
  const mRules = reactive<FormRules>({
    mobile: [
      {
        key: 'mobile',
        required: true,
        renderMessage: () => t('login.mobile.required'),
      },
      {
        key: 'mobile',
        pattern: /^1[3456789]\d{9}$/,
        renderMessage: () => t('login.mobile.rule'),
      },
    ],
    code: [
      {
        required: true,
        renderMessage: () => t('login.mobile.verification-code.required'),
      },
      {
        min: 6,
        max: 6,
        renderMessage: () => t('login.mobile.verification-code.rule'),
      },
    ],
  })

  // 验证码倒计时逻辑
  const startTime = () => {
    time.value = 120
    const timer = setInterval(() => {
      if (time.value <= 0) {
        timeState.value = false
        clearInterval(timer)
      }
      else {
        time.value--
      }
    }, 1000)
  }

  // 发送验证码
  const sendCode = async () => {
    const msgIns = window.$message?.loading(t('login.mobile.verification-code.loading'))
    try {
      await mFormRef.value?.validate(
        undefined,
        rule => rule?.key === 'mobile',
      )
      await userSendCodeApi({ mobile: mModel.mobile })
      timeState.value = true
      msgIns?.destroy()
      window.$message?.loading(t('login.mobile.verification-code.success'))
      startTime()
    }
    catch (error) {
      msgIns?.destroy()
    }
  }
  const mLogin = async () => {
    try {
      // 1.加载loading状态
      mLoading.value = true
      // 2.校验表单是否正确
      await mFormRef.value?.validate(() => {})
      // 3.请求接口
      await userStore.login(mModel)
      // 4.请求成功设置token
      mLoading.value = false
      // 5.跳转到首页
      const redirect = router.currentRoute.value?.params?.redirect as string
      await router.replace(redirect || '/')
      mLoading.value = false
    }
    catch (error) {
      mLoading.value = false
    }
  }
  return {
    mFormRef,
    mModel,
    mLoading,
    mRules,
    mLogin,
    time,
    timeState,
    sendCode,
  }
}
