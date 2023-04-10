<script setup lang="ts">
import { LayoutBase, LayoutContent, LayoutHeader, Logo, Title } from '@/layouts/common'

const props = withDefaults(
  defineProps<{
    headerHeight?: number
    logo?: string
    title?: string
    inverted: boolean
  }>(),
  {
    headerHeight: 48,
    inverted: false,
  },
)

const headerHeightVar = computed(() => `${props.headerHeight}px`)
</script>

<template>
  <LayoutBase h-screen>
    <LayoutHeader
      :inverted="inverted"
      class="pro-admin-mix-layout-header flex justify-between items-center px-4"
    >
      <div flex items-center>
        <Logo :src="logo" />
        <Title :title="title" />
      </div>
      <slot name="headerRight">
        <div>右侧</div>
      </slot>
    </LayoutHeader>
    <LayoutContent content-style="padding: 24px;">
      <slot />
    </LayoutContent>
  </LayoutBase>
</template>

<style scoped>
.pro-admin-mix-layout-header {
  height: v-bind(headerHeightVar);
}
</style>
