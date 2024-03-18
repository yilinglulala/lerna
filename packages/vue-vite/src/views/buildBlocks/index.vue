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
        <el-aside width="320px">
          <div class="demo-collapse">
            <el-collapse v-model="activeNames" @change="handleChange" class="mx-4">
              <el-collapse-item v-for="item in compConfig" :title="item.title" :name="item.key" :key="item.key" >
                <el-button
                  v-for="comp in item.items"
                  :key="comp.key"
                  @click="setCode(comp.key)"
                >
                  {{ comp.label }}
                </el-button>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <page-editor></page-editor>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import PageEditor from './pageEditor.vue'
import { useSourceCodeStore } from '@store/index'
const store = useSourceCodeStore()
let { setCode } = store

let tools = reactive([
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

let compConfig = reactive([
  { title: '布局', key: 'layout', items: [{ label: '容器', key: 'container' }] },
  {
    title: '控件', key: "comp",
    items: [
      { label: '文本', key: 'text' },
      { label: '图片', key: 'image' },
      { label: '按钮', key: 'button' },
      { label: '轮播', key: 'carousel ' },
    ],
  },
])
const activeNames = ref(['layout','comp'])
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
