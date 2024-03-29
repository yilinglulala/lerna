<template>
  <div class="new-process-container">
    <div style="display: inline-block;">
      <card type="trigger" />
      <Branch/>
      <card type="action" />
    </div>

    <!-- <canvas id="canvas" width="1000" height="1000"></canvas> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Card from './card.vue'
import Branch from './branch.vue'
import img1 from '@/assets/img/01.png'
type TImgType = 'trigger' | 'branch' | 'action'
let ctx: CanvasRenderingContext2D | null = null
// 1. 直接使用canvas, 文本渲染，或者数据变化，实在是不方便
//

onMounted(() => {
  // var canvas = document.getElementById('canvas') as HTMLCanvasElement
  // if (canvas.getContext) {
  //   ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  //   let x = 10,
  //     y = 10,
  //     w = 312,
  //     topH = 36,
  //     bottomH = 52,
  //     h = topH + bottomH
  //   roundedRect(ctx, x, y, w, h, 6)
  //   ctx.fillText('1', x, 20)
  //   drawImage('trigger', 20, 10)
  //   ctx.fillText('触发器', 50, 20)
  //   ctx.moveTo(x, y + topH)
  //   ctx.lineTo(x + w, y + topH)
  //   ctx.stroke()
  //   ctx.font = '14px serif'
  //   ctx.fillText('请选择', x, 68)
  //   let w1 = ctx.measureText('请').width
  //   ctx.fillText('和', x + w1 * 6 + 8, 68)
  //   ctx.fillStyle = '#f00'
  //   ctx.fillText('连接器', x + w1 * 3 + 4, 68)
  //   ctx.fillText('触发器', x + w1 * 7 + 12, 68)
  //   ctx.moveTo(x + w *0.5, y + h)
  //   ctx.lineTo(x + w *0.5, y + h + 56)
  //   ctx.stroke()
  // }
  // canvas.addEventListener('click',(e)=>{
  //   // debugger
  // })
})
const images: any = {
  trigger: null,
  branch: null,
  action: null,
}
// 绘制图片
const drawImage = (image: TImgType, x: number, y: number) => {
  let img = images[image]
  if (!img) {
    img = new Image()
    img.onload = function () {
      ctx?.drawImage(img, x, y)
    }
    img.src = img1
  } else {
    ctx?.drawImage(img, x, y)
  }
}
// 绘制圆角矩形
const roundedRect = (
  ctx: any,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  ctx.beginPath()
  ctx.moveTo(x, y + radius)
  ctx.lineTo(x, y + height - radius)
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
  ctx.lineTo(x + width - radius, y + height)
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
  ctx.lineTo(x + width, y + radius)
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
  ctx.lineTo(x + radius, y)
  ctx.quadraticCurveTo(x, y, x, y + radius)
  ctx.stroke()
}
// TODO 删除节点
// 添加节点
</script>

<style lang="scss">
.new-process-container {
  background-color: #f0f2f4;
  height: 100vh;
  overflow: auto;
  #canvas {
    width: 1000px;
    height: 1000px;
    border: 1px solid olivedrab;
  }
  .flex {
    display: flex;
  }
  .flex-column {
    @extend .flex;
    flex-direction: column;
  }
  .space-between {
    justify-content: space-between;
  }
  .align-center {
    align-items: center;
  }

  .cursor-pointer {
    cursor: pointer;
  }
}
</style>
