<script setup lang="ts">
import {
  GithubOutlined,
  LockOutlined,
  MobileOutlined,
  UserOutlined,
} from '@vicons/antd'
import { useAccountLogin } from './composables/account-login'
import { useMobileLogin } from './composables/mobile-login'
import { BlankLayout } from '@/layouts'

const { formRef, model, loading, rules, login } = useAccountLogin()
const { mFormRef, mModel, mLoading, mRules, mLogin, time, timeState, sendCode } = useMobileLogin()
</script>

<template>
  <BlankLayout
    tag="div"
    flex="~ col"
    class="pro-admin-login-container h-screen"
  >
    <div flex="~ col" class="py-20px items-center justify-center">
      <div class="flex items-center">
        <img src="@/assets/vue.svg" h-40px w-40px alt="">
        <span ml-3 text-33px font-600>Naive Admin Pro</span>
      </div>
      <div
        class="flex items-center mt-12px mb-40px text-[var(--text-color-3)]"
      />
      {{ $t("login.admin.desc") }}
    </div>
    <div mx-auto w-350px>
      <n-tabs
        default-value="account"
        animated
        type="line"
        justify-content="space-evenly"
      >
        <n-tab-pane name="account" :tab="$t('login.account.tab')">
          <n-form
            ref="formRef"
            :model="model"
            :rules="rules"
            label-align="left"
            label-placement="left"
          >
            <n-form-item-row path="username">
              <n-input
                v-model:value="model.username"
                :placeholder="$t('login.username.placeholder')"
              >
                <template #prefix>
                  <n-icon :component="UserOutlined" />
                </template>
              </n-input>
            </n-form-item-row>
            <n-form-item-row path="password">
              <n-input
                v-model:value="model.password"
                type="password"
                show-password-on="click"
                :placeholder="$t('login.password.placeholder')"
              >
                <template #prefix>
                  <n-icon :component="LockOutlined" />
                </template>
              </n-input>
            </n-form-item-row>
            <n-form-item-row path="rememberMe">
              <div class="flex w-100% items-center justify-between">
                <n-checkbox v-model:checked="model.rememberMe">
                  {{ $t("login.remember-me") }}
                </n-checkbox>
                <a class="cursor-pointer text-[var(--text-color-3)]">{{
                  $t("login.forgot-password")
                }}</a>
              </div>
            </n-form-item-row>
          </n-form>
          <n-button
            type="primary"
            block
            secondary
            strong
            :loading="loading"
            @click="login"
          >
            {{ $t("login.login") }}
          </n-button>
        </n-tab-pane>
        <n-tab-pane name="mobile" :tab="$t('login.mobile.tab')">
          <n-form ref="mFormRef" :model="mModel" :rules="mRules" label-align="left" label-placement="left">
            <n-form-item-row path="mobile">
              <n-input v-model:value="mModel.mobile" :placeholder="$t('login.mobile.placeholder')">
                <template #prefix>
                  <n-icon :component="MobileOutlined" />
                </template>
              </n-input>
            </n-form-item-row>
            <n-form-item-row path="code">
              <n-input-group>
                <n-input
                  v-model:value="mModel.code"
                  :placeholder="
                    $t('login.mobile.verification-code.placeholder')
                  "
                >
                  <template #prefix>
                    <n-icon :component="LockOutlined" />
                  </template>
                </n-input>
                <n-button type="primary" ghost :disabled="timeState" @click="sendCode">
                  {{
                    timeState ? `${time}s ${$t('login.mobile.resend')}`
                    : $t("login.mobile.verification-code.get-verification-code")
                  }}
                </n-button>
              </n-input-group>
            </n-form-item-row>
            <n-form-item-row path="rememberMe">
              <div class="flex w-100% items-center justify-between">
                <n-checkbox v-model:checked="mModel.rememberMe">
                  {{ $t("login.remember-me") }}
                </n-checkbox>
                <a class="cursor-pointer text-[var(--text-color-3)]">{{
                  $t("login.forgot-password")
                }}</a>
              </div>
            </n-form-item-row>
          </n-form>
          <n-button type="primary" :loading="mLoading" block secondary strong @click="mLogin">
            {{ $t("login.login") }}
          </n-button>
        </n-tab-pane>
      </n-tabs>
      <div class="flex mt-24px items-center">
        {{ $t("login.sign-in-with") }}
        <n-icon
          size="24"
          class="cursor-pointer text-[var(--text-color-3)] hover:text-[var(--primary-color)]"
          :component="GithubOutlined"
        />
      </div>
    </div>
  </BlankLayout>
</template>
