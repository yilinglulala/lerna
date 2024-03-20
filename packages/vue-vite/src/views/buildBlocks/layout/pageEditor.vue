<template>
  <div class="h-full" @click="$emit('click-page')">
    <vue-draggable-next
      :list="componentList"
      ghost-class="ghost"
      chosen-class="chosenClass"
      animation="300"
      group="comp"
      @start="onStart"
      @end="onEnd"
    >
      <div v-for="comp in componentList" :key="comp.id">
        <component
          :is="comp.component || 'div'"
          v-bind="{ ...comp.bind }"
          :style="comp.style"
          @click.stop="clickComp(comp)"
          class="relative"
        >
          {{ comp.text }}
          <div class="selected-comp border-4"></div>
        </component>
      </div>
    </vue-draggable-next>
  </div>
</template>
<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useSourceCodeStore } from '@store/index'
const store = useSourceCodeStore()
let { setCode } = store
let code = computed(() => store.code)

const emit = defineEmits(['click-comp'])

// todo 组件删除，编辑，拖拽改大小

const componentList = reactive([
  {
    component: 'div',
    id: '1',
    text: '我是文本',
    bind: {},
  },
  {
    component: 'img',
    id: '2',
    style: {
      width: '200px',
    },
    bind: {
      src: '/src/assets/img/01.png',
    },
  },
])
let activeComp = ref('')

const clickComp = (comp) => {
  activeComp.value = comp.key
  emit('click-comp', comp)
}
const onEnd = (e) => {
  console.log('onEnd', e)
}
</script>
<style lang="scss" scoped>
.selected-comp {
  // border-color: pink;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
