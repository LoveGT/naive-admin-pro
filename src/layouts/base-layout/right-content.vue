<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import { FullscreenExitOutlined, FullscreenOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@vicons/antd'
import type { Component, VNodeChild } from 'vue'
import SelectLang from '../select-lang/index.vue'
import SelectUser from '../select-user/index.vue'
import Notify from '../notify/index.vue'

const appLocal = useAppLocale()

const userStore = useUserStore()
const avatar = computed(() => userStore.userInfo?.avatar)
const nickname = computed(
  () => userStore.userInfo?.nickname ?? userStore.userInfo?.username,
)

const { t } = useI18n()
const renderIcon = (icon: Component) => h(NIcon, null, { default: () => h(icon) })

const userOptions = ref<DropdownOption[]>([
  {
    label: () => t('global.layout.header.right.user.center'),
    key: 'user-center',
    icon: () => renderIcon(UserOutlined),
  },
  {
    label: () => t('global.layout.header.right.user.setting'),
    key: 'user-setting',
    icon: () => renderIcon(SettingOutlined),
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    label: () => t('global.layout.header.right.logout'),
    icon: () => renderIcon(LogoutOutlined),
    key: 'logout',
  },
])

const userSelect = (key: string) => {
  if (key === 'logout')
    userStore.logout()
}
</script>

<template>
  <n-space align="center" size="large">
    <Notify />
    <SelectUser :options="userOptions" :nickname="nickname" :avatar="avatar" @select="userSelect" />
    <SelectLang v-model:value="appLocal" />
  </n-space>
</template>

<style scoped></style>
