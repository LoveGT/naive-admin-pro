<script setup lang="ts">
import Container from './container.vue'
import NotifyItem from './notify-item.vue'
import MessageItem from './message-item.vue'
import UpcomingItem from './upcoming-item.vue'
</script>

<template>
  <div>
    <n-tabs default-value="notify" justify-content="center" type="line">
      <n-tab-pane name="notify" tab="通知">
        <Container>
          <NotifyItem
            title="测试通知"
            avatar="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            desc="五天前"
          />
          <NotifyItem
            title="测试通知"
            avatar="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            desc="五天前"
          />
          <NotifyItem
            read
            title="测试通知"
            avatar="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            desc="五天前"
          />
        </Container>
      </n-tab-pane>
      <n-tab-pane name="message" tab="消息">
        <Container>
          <MessageItem
            title="测试通知"
            avatar="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            desc="五天前"
          />
        </Container>
      </n-tab-pane>
      <n-tab-pane name="upcoming" tab="待办">
        <Container>
          <UpcomingItem
            title="测试通知"
            avatar="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            desc="五天前"
          />
        </Container>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped></style>
