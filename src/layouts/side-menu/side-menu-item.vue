<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

const props = defineProps<{
  route: RouteRecordRaw
}>()

const title = computed(() => props.route.meta?.title)
const path = computed(() => props.route.path)
const hasChildren = computed(() => props.route.children && props.route.children.length > 0)
const isFullPath = computed(() => path.value?.startsWith('http'))
const target = computed(() => props.route.meta?.target ?? '_blank')
</script>

<template>
  <template v-if="hasChildren">
    {{ title }}
  </template>
  <template v-else-if="isFullPath">
    <a :href="path" :target="target">
      {{ title }}
    </a>
  </template>
  <template v-else>
    <router-link :to="path">
      {{ title }}
    </router-link>
  </template>
</template>

<style scoped>

</style>
