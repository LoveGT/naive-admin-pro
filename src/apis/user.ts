import type { IncludeNull } from '../utils/types'

export interface UserInfo {
  id: number
  username: string
  nickname?: string
  email?: string
  mobile?: string
  avatar?: string
  signature?: string
  realName?: string
  money?: number
  birth?: string
}

export interface MenuInfo {
  // 主键id
  id: number
  // 父级id
  pid?: number
  // 路由地址
  path: string
  // 路由名称
  name?: string
  // 路由标题
  title: string
  // 路由图标
  icon?: string
  // 路由组件
  component?: string
  // 路由重定向
  redirect?: string
}

export const userLoginUrl = '/user/login'
export const userSendCodeUrl = '/user/send-code'
export const userGetInfoUrl = '/user/info'
// 路由地址
export const userRoutesUrl = '/user/menus'
// export const userGetInfoUrl = '/test/401'

export interface UserAccountLoginParams {
  username?: IncludeNull<string>
  password?: IncludeNull<string>
  captcha?: IncludeNull<string>
  rememberMe: IncludeNull<boolean>
}
export interface UserMobileLoginParams {
  mobile: IncludeNull<string>
  code: IncludeNull<string>
  type: 'mobile'
  rememberMe: IncludeNull<boolean>
}
export interface UserLoginResult {
  token: string
}

export const userLoginApi = (params: UserAccountLoginParams | UserMobileLoginParams) => {
  return usePost<UserAccountLoginParams | UserMobileLoginParams, UserLoginResult>(userLoginUrl, params)
}

// 手机验证码登录
export type UserSendCodeParams = Pick<UserMobileLoginParams, 'mobile'>

export const userSendCodeApi = (params: UserSendCodeParams) => {
  return usePost(userSendCodeUrl, params)
}

// 获取用户信息
export const userGetInfoApi = () => {
  return useGet<any, UserInfo>(userGetInfoUrl)
}
// 路由接口
export const userGetMenusApi = () => {
  return useGet<any, MenuInfo[]>(userRoutesUrl)
}
