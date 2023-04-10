<script setup lang="ts">
import { menuProps } from 'naive-ui'
const props = defineProps({
  ...menuProps,
})
</script>

<template>
  <n-menu v-bind="props" />
</template>

<style scoped>

</style>
