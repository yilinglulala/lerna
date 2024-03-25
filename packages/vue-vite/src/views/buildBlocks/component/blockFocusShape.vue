<template>
  <div
    class="block-focus-shape-line"
    v-for="i in scaleLinePoints"
    :key="i"
    :style="getShapeLineStyle(i)"
    @mousedown.stop="(e) => handleMouseDownPoint(e, i)"
  ></div>
  <div class="tools absolute">
    <span v-for="tool in tools" :key="tool.key" @click.stop="handleTool(tool.key)">
      {{ tool.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type TPoint = 'l' | 'r' | 't' | 'b'
let props = defineProps(['block'])
const emit = defineEmits(['del','events'])
let block1: any = computed(() => props.block)
const scaleLinePoints = ['l', 'r', 't', 'b'] // 横纵伸缩
const cursorPoints = {
  lt: 'nw',
  rt: 'ne',
  lb: 'sw',
  rb: 'se',
  l: 'w',
  r: 'e',
  t: 'n',
  b: 's',
}
const getShapeLineStyle = (point: TPoint) => {
  const linePointStyles = {
    l: {
      width: '3px',
      height: '100%',
      left: 0,
      top: 0,
    },
    r: {
      width: '3px',
      height: '100%',
      right: 0,
      top: 0,
    },
    t: {
      width: '100%',
      height: '3px',
      top: 0,
      left: 0,
    },
    b: {
      width: '100%',
      height: '3px',
      bottom: 0,
      left: 0,
    },
  }
  return {
    ...linePointStyles[point],
    cursor: `${cursorPoints[point]}-resize`,
  }
}
const handleMouseDownPoint = (event: MouseEvent, point: TPoint) => {
  event.stopPropagation()
  const { clientX: startX, clientY: startY } = event
  let block = block1.value
  let el = document.getElementById(block.id) as HTMLElement
  let { clientWidth: width, clientHeight: height } = el
  // const { width, height, left, top } = block.style

  const pointMouseMove = (event: MouseEvent) => {
    const hasL = /l/.test(point),
      hasT = /t/.test(point),
      hasR = /r/.test(point),
      hasB = /b/.test(point)
    let { clientX: moveX, clientY: moveY } = event
    const durX = moveX - startX,
      durY = moveY - startY
    block.style = {
      ...block.style,
      width: Math.max(10, width + (hasL ? -durX : hasR ? durX : 0)) + 'px', // 不存在 l 和 r，说明纵向缩放，width 不动
      height: Math.max(10, height + (hasT ? -durY : hasB ? durY : 0)) + 'px', // 不存在 t 和 b，说明横向缩放，height 不动
      // left: Math.min(left + width, left + (hasL ? durX : 0)), // 从左向右拖，不能超过 right，从右往左拖，left 不动
      // top: Math.min(top + height, top + (hasT ? durY : 0)), // 从上往下拖，不能超过 bottom，从下往上拖，top 不懂
    }
  }

  const pointMouseUp = () => {
    document.removeEventListener('mousemove', pointMouseMove)
    document.removeEventListener('mouseup', pointMouseUp)
  }

  document.addEventListener('mousemove', pointMouseMove)
  document.addEventListener('mouseup', pointMouseUp)
}

/********** 工具列 **********/

const tools = [
  { name: '删除', key: 'del' },
  { name: '复制', key: 'copy' },
]
// 点击工具
const handleTool = (key: 'del') => {
  let obj = {
    del: () => {
      emit('del', block1)
    },
  }
  if (obj[key]) {
    obj[key]()
  } else {
    emit('events','copy', block1)
  }
  
}
</script>

<style lang="scss" scoped>
.block-focus-shape-line {
  position: absolute;
  background: #79b5f1;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  &::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    background: #3297fc;
    transform: translate(-50%, -50%);
  }
}
.tools {
  top: -20px;
  right: 0;
  font-size: 12px;

  > span {
    padding: 4px;
    background: #3297fc;
    color: #fff;
  }
}
</style>
