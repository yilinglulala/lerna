<template>
      <!-- filter=".block-focus-shape-line" -->
  <div class="h-full" @click="$emit('click-page')">
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
        <span class="relative inline-block">
          <component
            :id="comp.id"
            :is="comp.component || 'div'"
            v-bind="{ ...comp.bind }"
            :style="comp.style"
            @click.stop="clickComp(comp)"
            class="mover"
          >
            {{ comp.text }}
          </component>
          {{activeComp.value}}
          <block-focus-shape v-if="activeComp===comp.id" :block="comp"/>
        </span>
      </div>
    </vue-draggable-next>
  </div>
</template>
<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { BlockFocusShape } from '../component/index'

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
    style: {

    }
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
  activeComp.value = comp.id
  emit('click-comp', comp)
}
const onEnd = (e) => {
  console.log('onEnd', e)
}

</script>
<style lang="scss" scoped>
</style>
