import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import router from '../router'
import { STORAGE_AUTHORIZE_KEY, useAuthorization } from '@/composables/authorization'
import i18n from '@/locales'

export interface ResponseBody<T = any> {
  code: number
  data?: T
  msg: string
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API ?? '/',
  timeout: 60000,
})

const requestHandler = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const token = useAuthorization()
  if (token.value) {
    config.headers = {
      ...config.headers,
      [STORAGE_AUTHORIZE_KEY]: token.value,
    }
  }
  return config
}

const responseHandler = (response: any): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any => {
  return response.data
}

const errorHandler = (error: AxiosError): Promise<any> => {
  // 判断是否存在response
  if (error.response) {
    const token = useAuthorization()
    const { data, status, statusText } = error.response as AxiosResponse<any>
    if (status === 401) {
      // 重新登录
      window.$notification?.error({
        title: i18n.global.t('global.request.error.401'),
        content: data?.msg || statusText,
        duration: 3000,
      })
      token.value = null
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.value.path,
        },
      }).then(() => {})
    }
    else if (status === 403) {
      //
      window.$notification?.error({
        title: i18n.global.t('global.request.error.403'),
        content: data?.msg || statusText,
        duration: 3000,
      })
    }
    else if (status === 500) {
      window.$notification?.error({
        title: i18n.global.t('global.request.error.500'),
        content: data?.msg || statusText,
        duration: 3000,
      })
    }
    else {
      window.$notification?.error({
        title: i18n.global.t('global.request.error.other'),
        content: data?.msg || statusText,
        duration: 3000,
      })
    }
  }
  return Promise.reject(error)
}

instance.interceptors.request.use(requestHandler)

instance.interceptors.response.use(responseHandler, errorHandler)

export default instance

export const useGet = <T = any, R =any>(url: string, params?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    params,
    method: 'GET',
    ...config,
  })
}

export const usePost = <T = any, R =any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    data,
    method: 'POST',
    ...config,
  })
}

export const usePut = <T = any, R =any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    data,
    method: 'PUT',
    ...config,
  })
}

export const useDelete = <T = any, R =any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    data,
    method: 'DELETE',
    ...config,
  })
}
