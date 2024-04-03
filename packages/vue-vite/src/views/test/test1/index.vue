<template>
  <split-panel v-model="activeTab" :tab-list="tabList" class="link-container">
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
import Linker from "./Linker/index.vue"
const router = useRouter()

const activeTab = ref('Linker')
const tabList = [
  { label: '企业连接器', name: 'Linker' },
  { label: '企业链接流', name: 'Flow' },
]
const comps = {
  Linker,
  // Linker
}
//【保存】
const handleConfirm = () => {}
// 【取消】
const handleCancel = () => {
  router.back()
}
</script>

<style lang="scss">
$c-border: #EAEAEA;
.link-container {
  .main {
    position: relative;
    height: calc(100vh - 60px);
    padding: 18px 24px;
  }
  .main-footer {
    position: absolute;
    bottom: 0;
    width: calc(100% - 48px);
    height: 59px;
    line-height: 60px;
    border-top: 1px solid $c-border;
    text-align: center;
  }
  .tip {
    color: #666;
  }
  .flex {
    display: flex;
  }
  .title-18 {
    font-size: 18px;
    font-weight: bold;
    line-height: 58px;
  }
  .border {
    border: 1px solid $c-border
  }
  .b-t {
    border-top: 1px solid $c-border;
  }
  .b-b {
    border-bottom: 1px solid $c-border;
  }
  
}
</style>
