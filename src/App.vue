<script setup lang="ts">
const appStore = useAppStore()
const { layoutTheme, overridesTheme } = storeToRefs(appStore)
useAutoDark()
const { naiveLocale } = useAutoLang()
</script>

<template>
  <n-config-provider
    :locale="naiveLocale.locale"
    :date-locale="naiveLocale.dateLocale"
    :theme="layoutTheme"
    :theme-overrides="overridesTheme"
  >
    <n-global-style />
    <naive-provider>
      <RouterView />
    </naive-provider>
  </n-config-provider>
</template>

<style scoped></style>
