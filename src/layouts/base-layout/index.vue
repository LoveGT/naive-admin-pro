<script setup lang="ts">
import MixLayout from '../mix-layout/index.vue'
import SideLayout from '../side-layout/index.vue'
import TopLayout from '../top-layout/index.vue'
import MobileLayout from '../mobile-layout/index.vue'
import SettingDrawer from '../setting-drawer/index.vue'
import RightContent from './right-content.vue'
// import { menuOptions } from '@/layouts/side-menu/menu-data'
const appStore = useAppStore()
const { layout, visible, layoutList, layoutStyleList, themeList } = storeToRefs(appStore)

const userStore = useUserStore()
const menuOptions = computed(() => userStore.menuData)

const { isMobile, isPad, isDesktop } = useQueryBreakpoints()
watchEffect(() => {
  if (isPad.value) appStore.toggleCollapsed(true)
  else if (isDesktop.value) appStore.toggleCollapsed(false)
  else if (isMobile.value) appStore.toggleCollapsed(false)
})
</script>

<template>
  <MobileLayout
    v-if="isMobile"
    v-model:visible="visible"
    :title="layout.title"
    :logo="layout.logo"
  >
    <template #headerRight>
      <RightContent />
    </template>
    <router-view />
  </MobileLayout>
  <template v-else>
    <MixLayout
      v-if="layout.layout === 'mix'"
      v-model:collapsed="layout.collapsed"
      :logo="layout.logo"
      :title="layout.title"
      :options="menuOptions"
      :show-sider-trigger="layout.showSiderTrigger"
      :sider-collapsed-width="layout.siderCollapsedWidth"
      :sider-width="layout.siderWidth"
    >
      <template #headerRight>
        <RightContent />
      </template>
      <router-view />
    </MixLayout>
    <SideLayout
      v-if="layout.layout === 'side'"
      v-model:collapsed="layout.collapsed"
      :logo="layout.logo"
      :title="layout.title"
      :inverted="layout.layoutStyle === 'inverted'"
      :show-sider-trigger="layout.showSiderTrigger"
      :sider-collapsed-width="layout.siderCollapsedWidth"
      :sider-width="layout.siderWidth"
    >
      <template #headerLeft>
        测试右侧插槽
      </template>
      <template #headerRight>
        <RightContent />
      </template>
      <router-view />
    </SideLayout>
    <TopLayout
      v-if="layout.layout === 'top'"
      :logo="layout.logo"
      :title="layout.title"
      :inverted="layout.layoutStyle === 'inverted'"
    >
      <template #headerRight>
        <RightContent />
      </template>
      <router-view />
    </TopLayout>
  </template>
  <SettingDrawer
    v-model:layout-style="layout.layoutStyle"
    v-model:layout="layout.layout"
    v-model:theme="layout.theme"
    :layout-list="layoutList"
    :layout-style-list="layoutStyleList"
    :theme-list="themeList"
  />
</template>

<style scoped></style>
