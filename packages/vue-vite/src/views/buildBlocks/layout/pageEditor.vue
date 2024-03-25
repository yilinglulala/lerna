<template>
  <!-- filter=".block-focus-shape-line" -->
  <div class="h-full" @click="clickPage">
    <!-- <vue-draggable-next
      :list="componentList"
      handle=".mover"
      ghost-class="ghost"
      chosen-class="chosenClass"
      animation="300"
      group="comp"
      @start="onStart"
      @end="onEnd"
    >
      <div v-for="comp in componentList" :key="comp.id">
        <span class="relative " :class="{'inline-block': !comp.key || !comp.key.includes('container')}">
          <component
            :id="comp.id"
            :is="comp.component || 'div'"
            :comp="comp"
            v-bind="{ ...comp.bind }"
            :style="comp.style"
            @click.stop="clickComp(comp)"
            class="mover"
          >
            {{ comp.text }}
          </component>
          {{ activeComp.value }}
          <block-focus-shape
            v-if="activeComp === comp.id"
            :block="comp"
            @del="handleDel"
          />
        </span>
      </div>
    </vue-draggable-next> -->
    <nestDraggable :componentList="componentList" :activeComp="activeComp" @click-comp="clickComp"></nestDraggable>
    <div class="text-center">
      <el-button >+</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import nestDraggable from '../renders/nestDraggble.vue'
 
import { useSourceCodeStore, useActiveCompIdStore } from '@store/index'
const store = useSourceCodeStore()
let { setCode } = store
let code = computed(() => store.code)

let { setActiveCompId, getActiveCompId } = useActiveCompIdStore()

const emit = defineEmits(['click-comp', 'click-page'])

// 组件列表
const componentList = reactive([
  {
    component: 'div',
    id: '1',
    text: '我是文本',
    bind: {},
    style: {},
  },
])

// 选中的组件
let activeComp = getActiveCompId

// 点击组件
const clickComp = (comp: { id: string }) => {
  // activeComp.value = comp.id
  setActiveCompId(comp.id)
  emit('click-comp', comp)
}

// 点击页面
const clickPage = () => {
  activeComp.value = ''
  emit('click-page')
}

// 操作相关
// 删除组件
// const handleDel = (comp: any) => {
//   debugger
//   componentList.splice(
//     componentList.findIndex((v) => v.id === comp.id),
//     1,
//   )
// }

const onEnd = (e) => {
  console.log('onEnd', e)
}
</script>
<style lang="scss" scoped></style>
