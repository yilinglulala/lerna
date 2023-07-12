<template>
  <div>
    <div class="flex m-b-16">
      <div>
        <el-input
          id="source"
          v-model="sourceContent"
          rows="20"
          placeholder="vue 或者js 文件"
          type="textarea"
        ></el-input>
        <el-button @click="clearSourceContent">清空</el-button>
      </div>
      <div>
        <el-input
          v-model="i18nkeys"
          rows="20"
          type="textarea"
          placeholder="i18nkeys,从excel 复制过来"
          suffix-icon="el-icon-date"
        ></el-input>
        <el-button @click="transformFromExcel">提取key</el-button>
      </div>
      <div>
        <el-input
          v-model="previewData"
          rows="20"
          type="textarea"
          placeholder="预览excel数据"
        ></el-input>
        <el-button @click="preview">预览</el-button>
      </div>

      <!-- <div>
        <el-upload v-model:file-list="fileList" :on-change="handleChange">
          上传zh.js
        </el-upload>
        <el-upload v-model:file-list="fileList" :on-change="handleChange">
          上传en.js
        </el-upload> 
      </div>-->
    </div>

    <el-button @click="transform">提取key</el-button>
    <el-button @click="toExcel">生成Excel</el-button>

    {{ [...keyArr] }}
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import * as XLSX from 'xlsx'
import xutils from 'xutils'
import { get } from 'lodash'
import zhjs from './lang/zh.js'
import enjs from './lang/en.js'
const sourceContent = ref(`tabList = [
    {
      label: this.$t("@i18n.sms.settings.duanxinshe"),
      label: this.$t('@i18n.sms.settings.duanxinshe1'),
    },
    $t('@i18n.sms.settings.duanxinshe2'),
  ];`)
// 清空
const clearSourceContent = () => {
  sourceContent.value = ''
  document.getElementById('source').focus()
}
const i18nkeys = ref('')

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
console.log(222, xutils.file.jsonToExcel)
const transformFromExcel = () => {
  keyArr.clear()
  i18nkeys.value.split('\n').forEach((v) => {
    keyArr.add(v)
  })
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
const creJsonData = () => {
  const jsonData: any = [
    // { name: 'Alice', age: 25 },
  ]

  ;[...keyArr].forEach((key) => {
    console.log(key, enjs[key])
    jsonData.push({
      key,
      zh: zhjs[key],
      en: enjs[key],
    })
  })
  return jsonData
}
const toExcel = () => {
  const jsonData: any = creJsonData()
  xutils.file.jsonToExcel(jsonData)
}
// 预览
const previewData = ref('')
const preview = () => {
  previewData.value = creJsonData()
    .map((v) => {
      return `${v.key}\t${v.zh}\t${v.en}\n`
    })
    .join('') // JSON.stringify(creJsonData(),undefined,4)
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
// File 转字符串
</script>

