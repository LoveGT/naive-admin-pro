import type { RouteRecordRaw } from 'vue-router'
import router from '../router'
import { dynamicRoutes, rootRouter } from '../router/dynamic-routes'
import { generateRoute } from '../router/generate-route'
import { generateMenu } from '../router/generate-menu'
import type {
  UserAccountLoginParams,
  UserInfo,
  UserMobileLoginParams,
} from '@/apis/user'
import {
  userGetInfoApi,
  userLoginApi,
} from '@/apis/user'
import i18n from '@/locales'

export const useUserStore = defineStore('user', () => {
  const t = i18n.global.t
  // state
  const userInfo = ref<UserInfo>()
  const token = useAuthorization()
  const routerRecords = ref<RouteRecordRaw[]>()

  // getters
  // 菜单数据格式化
  const menuData = computed(() => generateMenu(routerRecords.value ?? []))
  //  functions
  const setUserInfo = (info: UserInfo | undefined) => {
    userInfo.value = info
  }

  const setToken = (key: string | null) => {
    token.value = key
  }
  // actions
  const login = async (
    params: UserAccountLoginParams | UserMobileLoginParams,
  ) => {
    const { data } = await userLoginApi(params)
    if (data?.token) setToken(data.token)
  }

  const getUserInfo = async () => {
    const { data } = await userGetInfoApi()
    if (data) setUserInfo(data)
  }

  const logout = async () => {
    setToken(null)
    setUserInfo(undefined)
    window.$message?.success(t('global.layout.header.right.logout.success'))
    await router.replace({
      path: '/login',
      query: {
        redirect: router.currentRoute.value.path,
      },
    })
  }

  const generateRoutes = async () => {
    const currentRouter = {
      ...rootRouter,
      children: dynamicRoutes,
    }
    routerRecords.value = dynamicRoutes
    return currentRouter
  }

  const generateDynamicRoutes = async () => {
    const routerData = await generateRoute()
    if (routerData)
      routerRecords.value = routerData.children
    return routerData
  }
  return {
    userInfo,
    token,
    setUserInfo,
    login,
    getUserInfo,
    logout,
    routerRecords,
    generateRoutes,
    generateDynamicRoutes,
    menuData,
  }
})
