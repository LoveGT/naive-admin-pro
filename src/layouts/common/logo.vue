<script lang="ts" setup>
withDefaults(defineProps<{
  src?: string
  size?: number
}>(), {
  size: 24,
})
</script>

<template>
  <n-image :src="src" :width="size" :height="size" :preview-disabled="true" />
</template>

<style scoped>

</style>
