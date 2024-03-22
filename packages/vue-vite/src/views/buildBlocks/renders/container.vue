<template>
  <div>
    <vue-draggable-next
      style="height:100%"
      :list="comp1.componentList"
      handle=".mover"
      ghost-class="ghost"
      chosen-class="chosenClass"
      animation="300"
      group="comp"
      @start="onStart"
      @end="onEnd"
    >
      <div v-for="comp in comp1.componentList" :key="comp.id">
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
          <!-- {{ activeComp.value }}
          <block-focus-shape
            v-if="activeComp === comp.id"
            :block="comp"
            @del="handleDel"
          /> -->
        </span>
      </div>
    </vue-draggable-next>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
let props = defineProps(['comp'])
let comp1 = computed(()=>props.comp)
</script>
