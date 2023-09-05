<template>
  <div>
    <el-link
      type="primary"
      class="m-4"
      href="https://cloud-internet.yealinkops.com/#/i18n/index"
      target="_blank"
    >
      国际化平台
    </el-link>
    <div class="flex m-4">
      <div>
        <!-- <el-radio-group v-model="radio1" class="ml-4">
          <el-radio label="vue" size="large">vue</el-radio>
          <el-radio label="zh.js" size="large">zhjs</el-radio>
        </el-radio-group> -->
        <el-input
          id="source"
          v-model="sourceContent"
          rows="20"
          placeholder="vue 或者js 文件"
          type="textarea"
          class="mb-2"
        ></el-input>
        <el-button @click="clearSourceContent">清空</el-button>
        <el-button @click="transfromZhjs">zhjs</el-button>
      </div>
      <div>
        <el-input
          v-model="i18nkeys"
          rows="20"
          type="textarea"
          placeholder="i18nkeys,从excel 复制过来"
          suffix-icon="el-icon-date"
          class="mb-2"
        ></el-input>
        <el-button @click="transformFromExcel">提取key</el-button>
      </div>
      <div>
        <el-input
          v-model="previewData"
          rows="20"
          type="textarea"
          placeholder="预览excel数据"
          class="mb-2"
        ></el-input>
        <el-button @click="preview">预览</el-button>
        <!-- <el-button @click="handleCopy3">复制</el-button> -->
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

import { ElMessage } from 'element-plus'

const sourceContent = ref('')
// 清空
const clearSourceContent = () => {
  sourceContent.value = ''
  document.getElementById('source').focus()
}
const i18nkeys = ref('')
const en = ref('')
const result = ref('')
const keyArr = reactive(new Set())
const resArr = reactive(new Set())
const radio1 = ref('vue')

const transform = () => {
  const str = sourceContent.value
  const regex = /(this\.)?\$t\((("([^"]+)")|('([^']+)'))\)/g
  let match
  while ((match = regex.exec(str)) !== null) {
    keyArr.add(match[6] || match[4])
    resArr.add(`${match[1] ? match[1] : ''}$t("${match[4]}")`)
  }
  console.log([...keyArr])
}

const transfromZhjs = (data)=> {
  const str = sourceContent.value
  const regex = /(@i18n\.[^"]+)/g
  let match
  while ((match = regex.exec(str)) !== null) {
    keyArr.add(match[0])
    // resArr.add(`${match[1] ? match[1] : ''}$t("${match[4]}")`)
  }
}
const transformFromExcel = () => {
  keyArr.clear()
  i18nkeys.value.split('\n').forEach((v) => {
    keyArr.add(v.trim())
  })
}
const fileList = ref<any[]>([])
const handleChange = (uploadFile, uploadFiles) => {
  readFile(uploadFile.raw).then((data: string) => {
    let str = data
      .replace(/export\s+default/, '')
      .replace(/[(\n)(\r)]/g, '')
      .replace("'", "'")
    zh.value = str
  })
}
const creJsonData = () => {
  const jsonData: Array<any> = []
  ;[...keyArr].forEach((key) => {
    if (key && zhjs[key]) {
      jsonData.push({
        key,
        zh: zhjs[key],
        en: enjs[key],
      })
    }
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
  if (!keyArr.size) {
    ElMessage({
      message: '请先提取key',
      type: 'warning',
    })
    return
  }
  previewData.value = creJsonData()
    .map((v) => {
      return `${v.key}\t${v.zh}\t${v.en}\n`
    })
    .join('') // JSON.stringify(creJsonData(),undefined,4)
  handleCopy3()
}
const handleCopy3 = () => {
  if (previewData.value) {
    xutils.copyText(previewData.value)
    ElMessage({
      message: '复制成功',
      type: 'success',
    })
  }
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
</script>
