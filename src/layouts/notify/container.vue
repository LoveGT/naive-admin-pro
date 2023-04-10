<script setup lang="ts">

</script>

<template>
  <div class="w-330px">
    <n-scrollbar class="max-h-280px">
      <n-list :show-divider="false" hoverable clickable style="background: transparent">
        <slot />
      </n-list>
    </n-scrollbar>
  </div>
</template>

<style scoped>

</style>
