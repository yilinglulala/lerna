<template>
  <div>
    <el-button @click="createPdf">aaa</el-button>
    <el-button @click="createPdf('b')">bbb</el-button>
    <div id="b">
      <h1 style="border: 1px solid;">标题</h1>
      <span style="color: pink;">粉色文本</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { jsPDF } from 'jspdf'
const createPdf = (id) => {
  // 默认是 a4 纸张尺寸，纵向，单位是mm
  const doc = new jsPDF()
  if (id) {
    doc.html(document.querySelector('#b'), {
      callback: function (doc) {
        doc.save()
      },
      x: 10,
      y: 10,
    })
  } else {
    doc.text('Hello world!', 10, 10)
    doc.save('a4.pdf')
  }
}
</script>

<style scoped></style>
