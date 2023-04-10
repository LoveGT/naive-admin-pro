<script setup lang="ts">
import { LayoutBase, LayoutContent, LayoutSider, Logo, Title } from '@/layouts/common'

const props = withDefaults(
  defineProps<{
    headerHeight?: number
    logo?: string
    title?: string
    siderWidth?: number
    siderCollapsedWidth?: number
    showSiderTrigger?: boolean | 'bar' | 'arrow-circle'
    inverted: boolean
    collapsed?: boolean
  }>(),
  {
    headerHeight: 48,
    inverted: false,
    collapsed: false,
  },
)

defineEmits(['update:collapsed'])

const headerHeightVar = computed(() => `${props.headerHeight}px`)
</script>

<template>
  <n-layout has-sider h-screen>
    <LayoutSider
      :inverted="inverted"
      :collapsed-width="siderCollapsedWidth"
      :width="siderWidth"
      :show-trigger="showSiderTrigger"
      :collapsed="collapsed"
      @update:collapsed="($event) => $emit('update:collapsed', $event)"
    >
      <div flex items-center justify-center py-2>
        <Logo :src="logo" :size="30" />
        <Title v-if="!collapsed" :title="title" :size="20" />
      </div>
    </LayoutSider>
    <LayoutBase>
      <n-layout-header
        class="pro-admin-mix-layout-header flex justify-between items-center px-4"
      >
        <slot name="headerLeft">
          <div />
        </slot>
        <slot name="headerRight">
          <div />
        </slot>
      </n-layout-header>
      <LayoutContent content-style="padding: 24px;">
        <slot />
      </LayoutContent>
    </LayoutBase>
  </n-layout>
</template>

<style scoped>
.pro-admin-mix-layout-header {
  height: v-bind(headerHeightVar);
}
</style>
