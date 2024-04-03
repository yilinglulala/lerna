<template>
  <split-panel v-model="activeTab" :tab-list="tabList">
    <!-- <template #title>
      <div style="height:0"></div>
    </template> -->
    <component :is="comps[activeTab]"></component>
    <!-- <div v-if="activeTab === 'Linker'">Linker</div>
    <div v-if="activeTab === 'Flow'">Flow</div> -->
  </split-panel>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import base from './base.vue'
import auth from './auth.vue'
import triggerEvent from './triggerEvent.vue'
import action from './action.vue'
const router = useRouter()

const tabList = [
  { label: '基本信息', name: 'base' },
  { label: '鉴权设置', name: 'auth' },
  { label: '触发事件', name: 'triggerEvent' },
  { label: '执行动作', name: 'action' },
]
const activeTab = ref('auth')
// const activeTab = ref(tabList[0].name)
const comps = {
  base,
  auth,
  triggerEvent,
  action,
}
//【保存】
const handleConfirm = () => {}
// 【取消】
const handleCancel = () => {
  router.back()
}
</script>
