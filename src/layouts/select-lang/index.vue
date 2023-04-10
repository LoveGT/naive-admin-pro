<script lang="ts" setup>
import LangIcon from './lang-icon.vue'
defineProps<{
  value: string
}>()
const emit = defineEmits(['update:value'])

const appStore = useAppStore()
const { langOptions } = storeToRefs(appStore)

const handleSelect = (lang: string) => {
  emit('update:value', lang)
}
</script>

<template>
  <div class="text-18px cursor-pointer">
    <n-dropdown :value="value" :options="langOptions" @select="handleSelect">
      <LangIcon />
    </n-dropdown>
  </div>
</template>

<style scoped></style>
