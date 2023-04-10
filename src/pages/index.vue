<script lang="ts" setup>
const onGet = async () => {
  await useGet('https://mock.28yanyu.cn/mock/637af0d4080d2f1284a9e77b/test/401')
}

const onPost = async () => {
  await usePost('https://mock.28yanyu.cn/mock/637af0d4080d2f1284a9e77b/test/post')
}
const onPut = async () => {
  await usePut('https://mock.28yanyu.cn/mock/637af0d4080d2f1284a9e77b/test/put')
}
const onDelete = async () => {
  await useDelete('https://mock.28yanyu.cn/mock/637af0d4080d2f1284a9e77b/test/delete')
}
</script>

<template>
  <div>
    <n-space>
      <n-input />
      <n-button @click="onGet">
        get
      </n-button>
      <n-button @click="onPost">
        post
      </n-button>
      <n-button @click="onPut">
        put
      </n-button>
      <n-button @click="onDelete">
        delete
      </n-button>
    </n-space>
  </div>
</template>

<style scoped>

</style>
