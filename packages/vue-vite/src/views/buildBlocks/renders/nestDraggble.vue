<template>
  <vue-draggable-next
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
      <span
        class="relative"
        :class="{
          'inline-block': !comp.key || !comp.key.includes('container'),
        }"
      >
        <component
          :id="comp.id"
          :is="comp.component || 'div'"
          :componentList="comp.componentList"
          :activeComp="activeComp"
          v-bind="{ ...comp.bind }"
          :style="comp.style"
          @click.stop="clickComp(comp, true)"
          @click-comp="clickComp"
          class="mover"
        >
          {{ comp.text }}
        </component>
        <block-focus-shape
          v-if="activeComp.includes(comp.id)"
          :block="comp"
          @del="handleDel"
          @events="handleFoucusEvents"
        />
      </span>
    </div>
  </vue-draggable-next>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { BlockFocusShape } from '../component/index'
import { useActiveCompIdStore } from '../../../store'
import { cloneDeep } from 'lodash'
import { forEach } from 'lodash'

let { setActiveCompId } = useActiveCompIdStore()

let emit = defineEmits(['click-comp'])
let props = defineProps(['componentList', 'activeComp'])

let componentList = computed(() => props.componentList)
let activeComp = computed(() => props.activeComp)

const clickComp = (comp: any, setId = false) => {
  if (setId) {
    setActiveCompId(comp.id)
  }
  emit('click-comp', comp)
}

// 删除组件
const handleDel = (comp: any) => {
  componentList.value.splice(
    componentList.value.findIndex((v: any) => v.id === comp.id),
    1,
  )
}
// 深度遍历改id
const deepTraversal = (obj: any) => {
  obj.id = +new Date() * Math.random()
  if (obj.componentList) {
    obj.componentList.forEach((item: any) => {
      deepTraversal(item)
    })
  }
  return obj
}
// 焦点方块事件
const handleFoucusEvents = (name: string, comp: any) => {
  if (name === 'copy') {
    // TODO 要深度遍历改id
    let compNew = cloneDeep(comp.value)
    componentList.value.push(deepTraversal(compNew))
  }
}
</script>
