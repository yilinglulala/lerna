<template>
  <el-aside width="320px">
    <div class="demo-collapse">
      <el-collapse v-model="activeNames" @change="handleChange" class="mx-4">
        <el-collapse-item
          v-for="item in compConfig"
          :title="item.title"
          :name="item.key"
          :key="item.key"
        >
          <vue-draggable-next
            :list="item.items"
            ghost-class="ghost"
            chosen-class="chosenClass"
            animation="300"
            :sort="false"
            :group="{ name: 'comp', pull: 'clone', put: false }"
            :clone="cloneComp"
            @start="onStart"
            @end="onEnd"
          >
            <el-button v-for="comp in item.items" :key="comp.key">
              <span>{{ comp.label }}</span>
            </el-button>
          </vue-draggable-next>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-aside>
</template>
<script setup lang="ts">
import { cloneDeep } from 'lodash'
import { reactive, ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import * as Config from "../../attrConfig"

const activeNames = ref(['layout', 'comp'])
// 物料列表配置
const compConfig = reactive([
  {
    title: '布局',
    key: 'layout',
    items: [{ label: '容器', key: 'container' }],
  },
  {
    title: '控件',
    key: 'comp',
    items: [
      { label: '文本', key: 'text', ...Config.text },
      { label: '图片', key: 'image', ...Config.image },
      { label: '按钮', key: 'button' },
      { label: '轮播', key: 'carousel ' },
    ],
  },
])
// 复制组件
const cloneComp = (item) => {
  console.log(item)
  return {...cloneDeep(item), id: +new Date()}
}
const handleChange = () => {}
const onStart = (event) => {
  console.log('dragstart', event)
  // event.dataTransfer.setData('my-info', 'hello')
  // event.dataTransfer.setData('my-extra-info', 'world')
}
</script>
