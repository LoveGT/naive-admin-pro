<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div my-14px>
    <div mb-14px font-500 text-14px>
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<style scoped>

</style>
