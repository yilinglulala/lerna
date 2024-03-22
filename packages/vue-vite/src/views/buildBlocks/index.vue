<template>
  <div class="common-layout">
    <el-container>
      <el-header class="flex space-between align-item-center">
        <div>积木</div>
        <div class="text-right">
          <el-button v-for="item in tools" :key="item.key" @click="item.event">
            {{ item.label }}
          </el-button>
        </div>
      </el-header>
      <el-container>
        <Aside></Aside>
        <el-container>
          <el-main>
            <page-editor
              @click-comp="clickCompInEditor"
              @click-page="clickPage"
            ></page-editor>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
      <setter ref="setter" :detail="detail" />
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import Aside from './layout/aside/index.vue'
import PageEditor from './layout/pageEditor.vue'
import Setter from './layout/setter/index.vue'
import { useSourceCodeStore, useActiveCompIdStore } from '@store/index'
const store = useSourceCodeStore()
let { setCode } = store

let tools = reactive([
  { label: '清空', key: 'clear', event: () => {} },
  {
    label: '保存',
    key: 'save',
    event: () => {
      alert('保存')
    },
  },
  { label: '导入', key: 'import', event: () => {} },
  { label: '预览', key: 'preview', event: () => {} },
  { label: '源码', key: 'code', event: () => {} },
])
/********** setter **********/

const setter = ref(null) // 设置器的ref
const detail = ref(null) // 选中组件详情
// 编辑器点击组件
const clickCompInEditor = (comp: any) => {
  setter.value.setVisible(true)
  detail.value = comp
}
const clickPage = () => {
  setter.value.setVisible(false)
}
</script>
<style lang="scss" scoped>
.el-header {
  border-bottom: 1px solid var(--el-border-color);
}
.el-aside {
  height: calc(100vh - 61px);
  border-right: 1px solid var(--el-border-color);
}
</style>
