<script setup lang="ts">
const attrs = useAttrs()
</script>

<template>
  <n-layout-sider
    class="pro-admin-layout-sider"
    v-bind="attrs"
    collapse-mode="width"
  >
    <slot />
  </n-layout-sider>
</template>

<style scoped></style>
