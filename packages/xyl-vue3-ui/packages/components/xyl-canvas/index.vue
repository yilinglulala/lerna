<template>
  <div
    v-for="(item, i) in myList"
    :key="item.id"
    :style="{ transform: `translate(${item.left}px, ${item.top}px);` }"
    class="x-show-panel"
  >
    <canvas
      :ref="`showCanvasRef-${item.id}`"
      :style="{
        opacity: activeId === item.id ? 0 : 1,
      }"
      @mousedown.stop="handleActive(item)"
    ></canvas>
  </div>
  <div class="x-draw-panel"></div>
  <div class="x-transform-container"></div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  dataList: { type: Array },
  dataHandle: { type: Function },
})
const myList = computed(() => {
  return props.dataHandle ? props.dataHandle(props.dataList) : props.dataList
})
const activeId = ref('')
const activeItem = ref(null)
const handleActive = (item) => {
  activeId.value = item.id
  activeItem.value = item
}
</script>

<style>
.x-show-panel {
}
.x-draw-panel {
}
</style>
