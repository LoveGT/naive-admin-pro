<script setup lang="ts">
import * as icons from '@vicons/antd'
defineProps<{
  icon: string
}>()
</script>

<template>
  <n-icon :component="icons[icon]" />
</template>

<style scoped>

</style>
