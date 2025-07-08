<template>
  <div ref="container" class="mindmap-container">
    <svg ref="mainSvg" class="mindmap-svg"></svg>
    <svg ref="miniMapSvg" class="minimap-svg"></svg>
  </div>
</template>

<script setup>
import * as d3 from 'd3'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { data } from './mock'

const container = ref(null)
const mainSvg = ref(null)
const miniMapSvg = ref(null)

let width = 0
let height = 0

let root
let treeLayout
let zoomBehaviour
let currentTransform = d3.zoomIdentity

// D3 selections
let gMain // 主视图g元素
let gMini // 鹰眼图g元素

let viewportRect // 鹰眼图中视口矩形

// 缩放范围设置
const minZoom = 0.1
const maxZoom = 2
const padx = 100
const pady = 0

// 重新布局和渲染函数
function render() {
  if (!root) return
  treeLayout.size([height - 100, width - 200])
  treeLayout(root)

  // 边
  const links = root.links()

  const linkSelection = gMain
    .selectAll('line.link')
    .data(links, (d) => d.target.data.name)

  linkSelection.join(
    (enter) =>
      enter
        .append('line')
        .attr('class', 'link')
        .attr('stroke', '#555')
        .attr('stroke-width', 1.5)
        .attr('x1', (d) => d.source.y + padx)
        .attr('y1', (d) => d.source.x + pady)
        .attr('x2', (d) => d.target.y + padx)
        .attr('y2', (d) => d.target.x + pady),

    (update) =>
      update
        .attr('x1', (d) => d.source.y + padx)
        .attr('y1', (d) => d.source.x + pady)
        .attr('x2', (d) => d.target.y + padx)
        .attr('y2', (d) => d.target.x + pady),

    (exit) => exit.remove(),
  )

  // 节点
  const nodes = root.descendants()

  const nodeSelection = gMain
    .selectAll('g.node')
    .data(nodes, (d) => d.data.name)

  const nodeEnter = nodeSelection
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('cursor', 'pointer')
    .attr('transform', (d) => `translate(${d.y + padx},${d.x + pady})`)

  nodeEnter.append('circle').attr('r', 10).attr('fill', '#1f77b4')

  nodeEnter
    .append('text')
    .attr('dy', 3)
    .attr('font-family', 'sans-serif')
    .attr('font-size', 12)
    .attr('fill', '#333')
    .attr('x', (d) => (d.children ? -15 : 15))
    .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
    .text((d) => d.data.name)

  // 更新所有节点位置
  nodeSelection
    .merge(nodeEnter)
    .transition()
    .duration(300)
    .attr('transform', (d) => `translate(${d.y + padx},${d.x + pady})`)

  nodeSelection.exit().remove()

  updateMiniMap()
  updateViewportRect()
}

// 更新鹰眼图
function updateMiniMap() {
  if (!root) return

  const scale = getMiniMapScale()

  // 缩略边
  const links = root.links()
  const linkSelection = gMini
    .selectAll('line.linkMini')
    .data(links, (d) => d.target.data.name)

  linkSelection.join(
    (enter) =>
      enter
        .append('line')
        .attr('class', 'linkMini')
        .attr('stroke', '#aaa')
        .attr('stroke-width', 1)
        .attr('x1', (d) => d.source.y * scale)
        .attr('y1', (d) => d.source.x * scale)
        .attr('x2', (d) => d.target.y * scale)
        .attr('y2', (d) => d.target.x * scale),

    (update) =>
      update
        .attr('x1', (d) => d.source.y * scale)
        .attr('y1', (d) => d.source.x * scale)
        .attr('x2', (d) => d.target.y * scale)
        .attr('y2', (d) => d.target.x * scale),

    (exit) => exit.remove(),
  )

  // 缩略节点
  const nodes = root.descendants()
  const nodeSelection = gMini
    .selectAll('circle.nodeMini')
    .data(nodes, (d) => d.data.name)

  nodeSelection.join(
    (enter) =>
      enter
        .append('circle')
        .attr('class', 'nodeMini')
        .attr('r', 4)
        .attr('fill', '#666')
        .attr('cx', (d) => (d.y + padx) * scale)
        .attr('cy', (d) => (d.x + pady) * scale),

    (update) =>
      update
        .attr('cx', (d) => (d.y + padx) * scale)
        .attr('cy', (d) => (d.x + pady) * scale),

    (exit) => exit.remove(),
  )
}

// 计算鹰眼图比例尺
function getMiniMapScale() {
  return miniMapSvg.value.clientHeight / Math.max(width, height)
}

// 更新鹰眼图视口矩形
function updateViewportRect() {
  if (!viewportRect) return
  const scale = getMiniMapScale()

  const vx = (-currentTransform.x * scale) / currentTransform.k
  const vy = (-currentTransform.y * scale) / currentTransform.k

  const vw = miniMapSvg.value.clientWidth / currentTransform.k
  const vh = miniMapSvg.value.clientHeight / currentTransform.k

  viewportRect.attr('x', vx).attr('y', vy).attr('width', vw).attr('height', vh)
}

// *****************************************
// 初始化zoom行为
function initZoom() {
  zoomBehaviour = d3
    .zoom()
    .scaleExtent([minZoom, maxZoom])
    .on('zoom', (event) => {
      currentTransform = event.transform
      gMain.attr('transform', currentTransform)
      updateViewportRect()
    })

  d3.select(mainSvg.value).call(zoomBehaviour).style('cursor', 'grab')
}

// 主视图放缩跳转到指定位置和比例
function zoomTo(translateX, translateY, scaleK) {
  d3.select(mainSvg.value)
    .transition()
    .duration(500)
    .call(
      zoomBehaviour.transform,
      d3.zoomIdentity.translate(translateX, translateY).scale(scaleK),
    )
}

// 处理鹰眼图点击跳转视口
function onMiniMapClick(event) {
  if (!miniMapSvg.value) return
  const point = d3.pointer(event, miniMapSvg.value)
  const scale = getMiniMapScale()
  const mx = point[0]
  const my = point[1]

  // 计算主视图平移，使得主视图中心对应点击点
  const tx = (-mx / scale) * currentTransform.k + width / 2
  const ty = (-my / scale) * currentTransform.k + height / 2

  zoomTo(tx, ty, currentTransform.k)
}

// 初始化视口矩形并绑定事件
function initMiniMap() {
  gMini.style('pointer-events', 'all')
  viewportRect = gMini
    .append('rect')
    .attr('class', 'viewport-rect')
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .on('click', (e) => {
      // 阻止事件冒泡, 让父容器处理
      e.stopPropagation()
      onMiniMapClick(e)
    })
}

function setupSvg() {
  width = container.value.clientWidth
  height = container.value.clientHeight

  // 设置主SVG尺寸
  d3.select(mainSvg.value).attr('width', width).attr('height', height)

  // 设置鹰眼图尺寸
  d3.select(miniMapSvg.value).attr('width', 150).attr('height', 150)

  // 创建主g容器
  gMain = d3.select(mainSvg.value).select('g')
  if (gMain.empty()) {
    gMain = d3.select(mainSvg.value).append('g')
  }

  // 创建鹰眼图g容器
  gMini = d3.select(miniMapSvg.value).select('g')
  if (gMini.empty()) {
    gMini = d3.select(miniMapSvg.value).append('g')
  }
}

function onResize() {
  if (!container.value) return
  width = container.value.clientWidth
  height = container.value.clientHeight

  d3.select(mainSvg.value)
    .attr('width', width - 17)
    .attr('height', height - 17)

  render()
}

onMounted(() => {
  setupSvg()

  // 构造hierarchy数据
  root = d3.hierarchy(data)

  treeLayout = d3.tree()

  // 初始化缩放行为
  initZoom()

  // 初始化鹰眼图
  initMiniMap()

  render()

  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.mindmap-container {
  position: relative;
  width: 100vw;
  height: calc(100vh - 60px);
  user-select: none;
  overflow: hidden;
}
.mindmap-svg {
  border: 1px solid #ddd;
  background: #fff;
  display: block;
}
.minimap-svg {
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: 1px solid #ccc;
  background: #fafafa;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  user-select: none;
}
.node circle {
  fill: #1f77b4;
}
.node text {
  font: 12px sans-serif;
  user-select: none;
  pointer-events: none;
}
</style>
