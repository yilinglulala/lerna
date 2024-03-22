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
          @click.stop="clickComp(comp)"
          class="mover"
        >
          {{ comp.text }}
        </component>
        <block-focus-shape
          v-if="activeComp.includes(comp.id)"
          :block="comp"
          @del="$emit('del', comp)"
        />
      </span>
    </div>
  </vue-draggable-next>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { useActiveCompIdStore } from '../../../store'
import { BlockFocusShape } from '../component/index'
let { setActiveCompId } = useActiveCompIdStore()

let emit = defineEmits(['click-comp'])
let props = defineProps(['componentList', 'activeComp'])
let componentList = computed(() => props.componentList)
let activeComp = computed(() => props.activeComp)

const clickComp = (comp: any) => {
  setActiveCompId(comp.id)
  emit('click-comp', comp)
}
</script>
