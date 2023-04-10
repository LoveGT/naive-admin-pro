<script setup lang="ts">
import SelectLang from '../select-lang/index.vue'
const appLocal = useAppLocale()
</script>

<template>
  <n-el tag="div" flex="~ col" class="pro-admin-login-container h-screen">
    <!-- 语言选择 -->
    <div class="flex flex-shrink-0 h-48px px-24px items-center justify-end">
      <SelectLang v-model:value="appLocal" />
    </div>
    <!-- 头部插槽 -->
    <slot name="prefix" />
    <!-- 内容插槽 -->
    <div class="flex-1">
      <slot />
    </div>
    <!-- 底部插槽 -->
    <slot name="suffix">
      <div flex="~ shrink-0" class="items-center justify-center my-2">
        <span>
          Naive Admin Pro
          &copy; 2023后台管理系统</span>
      </div>
    </slot>
  </n-el>
</template>

<style scoped>
.pro-admin-login-container {
  background-image: url("@/assets/images/login-bg.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center 110px;
}
</style>
