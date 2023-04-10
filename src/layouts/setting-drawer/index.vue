<script setup lang="ts">
import { CloseOutlined, SettingOutlined } from '@vicons/antd'
import CheckboxLayout from './checkbox-layout.vue'
import Container from './container.vue'
import CheckboxTheme from './checkbox-them.vue'
import type { LayoutType } from '@/config/layout-theme'
import type { ThemeType } from '@/config/theme'

const props = withDefaults(
  defineProps<{
    floatTop?: number | string
    drawerWidth?: number
    layout: 'mix' | 'side' | 'top'
    layoutStyle: 'inverted' | 'light' | 'dark'
    layoutList?: LayoutType[]
    layoutStyleList?: LayoutType[]
    themeList: ThemeType[]
    theme: string
  }>(),
  {
    floatTop: 240,
    drawerWidth: 300,
    layout: 'mix',
    layoutStyle: 'inverted',
  },
)

defineEmits(['update:layout', 'update:layoutStyle', 'update:theme'])

const show = ref(false)
const onShow = () => {
  show.value = !show.value
}

const cssVars = computed(() => ({
  '--pro-admin-float-top': `${props.floatTop}px`,
  '--pro-admin-drawer-width': `${props.drawerWidth}px`,
}))
</script>

<template>
  <!-- 设置图标 -->
  <teleport to="body">
    <div
      :style="cssVars"
      class="fixed top-[var(--pro-admin-float-top)] right-0 b-rd-tr-0! b-rd-br-0!"
    >
      <n-button
        class="b-rd-tr-0! b-rd-br-0!"
        type="primary"
        size="large"
        @click="onShow"
      >
        <template #icon>
          <n-icon>
            <SettingOutlined />
          </n-icon>
        </template>
      </n-button>
    </div>
  </teleport>
  <!-- 抽屉内容 -->
  <n-drawer v-model:show="show" :width="drawerWidth" placement="right">
    <n-drawer-content>
      <div mb-14px>
        <Container
          v-if="layoutStyleList"
          :title="$t('global.layout.setting.drawer.style')"
        >
          <n-space size="large">
            <template v-for="item in layoutStyleList" :key="item.id">
              <CheckboxLayout
                :dark="item.dark"
                :layout="item.key"
                :title="$t(item.title)"
                :inverted="item.inverted"
                :checked="item.id === layoutStyle"
                @click="() => $emit('update:layoutStyle', item.id)"
              />
            </template>
          </n-space>
        </Container>
        <n-divider />
        <Container v-if="themeList" :title="$t('global.layout.setting.drawer.theme')">
          <n-space>
            <CheckboxTheme
              v-for="item in themeList"
              :key="item.key"
              :color="item.color"
              :title="$t(item.title)"
              :checked="item.key === theme"
              @click="() => $emit('update:theme', item.key)"
            />
          </n-space>
        </Container>
        <Container v-if="layoutList" :title="$t('global.layout.setting.drawer.layout')">
          <n-space size="large">
            <template v-for="item in layoutList" :key="item.key">
              <CheckboxLayout
                :layout="item.key"
                :title="$t(item.title)"
                :checked="item.key === layout"
                @click="() => $emit('update:layout', item.key)"
              />
            </template>
          </n-space>
        </Container>
      </div>
    </n-drawer-content>
    <!-- 关闭图标 -->
    <div
      :style="cssVars"
      class="absolute top-[var(--pro-admin-float-top)] right-[var(--pro-admin-drawer-width)] b-rd-tr-0! b-rd-br-0!"
    >
      <n-button
        class="b-rd-tr-0! b-rd-br-0!"
        type="primary"
        size="large"
        @click="onShow"
      >
        <template #icon>
          <n-icon>
            <CloseOutlined />
          </n-icon>
        </template>
      </n-button>
    </div>
  </n-drawer>
</template>

<style scoped></style>
