<template>
  <div>
    <div class="flex m-b-16">
      <div>
        <el-input id="source" v-model="sourceContent" rows="20" type="textarea"></el-input>
        <el-button @click="clearSourceContent">清空</el-button>
      </div>
      <el-input
        v-model="zh"
        rows="20"
        type="textarea"
        placeholder="请输入目标中文"
        suffix-icon="el-icon-date"
      ></el-input>
      <el-input
        v-model="en"
        rows="20"
        type="textarea"
        placeholder="请输入目标英文"
      ></el-input>
      <div>
        <el-upload v-model:file-list="fileList" :on-change="handleChange">
          上传zh.js
        </el-upload>
        <el-upload v-model:file-list="fileList" :on-change="handleChange">
          上传en.js
        </el-upload>
      </div>
    </div>

    <el-button @click="transform">提取key</el-button>
    <el-button @click="toExcel">生成Excel</el-button>

    {{ [...keyArr] }}
  </div>
</template>
<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from 'vue'
import * as XLSX from 'xlsx'
// const {file} = require('utils')
import zhjs from './lang/zh.js'
import enjs from './lang/zh.js'
const instance = getCurrentInstance();
const sourceContent = ref(`tabList = [
    {
      label: this.$t("@i18n.sms.settings.duanxinshe"),
      label: this.$t('@i18n.sms.settings.duanxinshe1'),
    },
    $t('@i18n.sms.settings.duanxinshe2'),
  ];`)
const clearSourceContent = () => {
  sourceContent.value = '';
  document.getElementById('source').focus();
}
const zh = ref(`{
"@i18n.sms.settings.duanxinshe": 111,
}`)
const en = ref(`
{
"@i18n.sms.settings.duanxinshe": "en111",
}`)
const result = ref('')
const keyArr = reactive(new Set())
const resArr = reactive(new Set())
const transform = () => {
  const str = sourceContent.value
  const regex = /(this\.)?\$t\((("([^"]+)")|('([^']+)'))\)/g
  let match
  while ((match = regex.exec(str)) !== null) {
    // debugger
    keyArr.add(match[6] || match[4])
    resArr.add(`${match[1] ? match[1] : ''}$t("${match[4]}")`)
  }
  console.log([...keyArr])
}
const fileList = ref<any[]>([])
const handleChange = (uploadFile, uploadFiles) => {
  readFile(uploadFile.raw).then((data) => {
    let str = data
      .replace(/export\s+default/, '')
      .replace(/[(\n)(\r)]/g, '')
      .replace("'", "'")
    zh.value = str
  })
}
const toExcel = () => {
  const jsonData: any = [
    // { name: 'Alice', age: 25 },
    // { name: 'Bob', age: 30 },
    // { name: 'Charlie', age: 35 },
  ];
 [...keyArr].forEach((key) => {
    jsonData.push({
      key,
      zh: zhjs[key],
      en: enjs[key],
    })
  })
  console.log(jsonData)
  const worksheet = XLSX.utils.json_to_sheet(jsonData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'data.xlsx'
  link.click()
  // file.jsonToExcel(jsonData)
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsText(file)
  })
}
// todo
// json 转excel
// File 转字符串
</script>
<style lang="scss">
div {
  // color: $c-green;
}
</style>
