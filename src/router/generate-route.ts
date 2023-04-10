import type { RouteRecordRaw } from 'vue-router'
import type { MenuInfo } from '../apis/user'
import { userGetMenusApi } from '../apis/user'
import modules from './modules'
import { rootRouter } from './dynamic-routes'

const defineComponent: Record<string, any> = {
  RouteView: () => import('@/layouts/base-layout/route-view.vue'),
  BlankView: () => import('@/layouts/base-layout/blank-view.vue'),
}

const getComponent = (component?: string) => {
  if (!component)
    return defineComponent.BlankView

  if (component in defineComponent)
    return defineComponent[component]

  return (modules as Record<string, any>)[component]
}

const generator = (menuInfo: MenuInfo[], pid?: number) => {
  const routes: RouteRecordRaw[] = []
  let currentMenus: MenuInfo[] = []
  if (!pid)
    currentMenus = menuInfo.filter(item => !item.pid)
  else
    currentMenus = menuInfo.filter(item => item.pid === pid)

  for (const currentMenu of currentMenus) {
    const currentRoute: RouteRecordRaw = {
      path: currentMenu.path,
      name: currentMenu.name,
      redirect: currentMenu.redirect,
      component: getComponent(currentMenu.component),
      meta: {
        title: currentMenu.title,
        id: currentMenu.id,
        pid: currentMenu.pid,
        icon: currentMenu.icon,
      },
      children: generator(menuInfo, currentMenu.id),
    }
    if (!currentRoute.children || currentRoute.children.length < 1)
      delete (currentRoute as RouteRecordRaw).children
    routes.push(currentRoute)
  }

  return routes
}

export const generateRoute = async () => {
  const { data } = await userGetMenusApi()
  if (data) {
    const routes = generator(data)
    return {
      ...rootRouter,
      children: routes,
    }
  }
}
