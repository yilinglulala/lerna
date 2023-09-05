<template>
  <div class="p-4">
    <div class="flex w-3/4 m-auto">
      <div>
        <el-radio-group v-model="unit" class="mb-2">
          <el-radio label="s" size="large">秒</el-radio>
          <el-radio label="ms" size="large">毫秒</el-radio>
        </el-radio-group>
        <el-input v-model="time" type="textarea" @click="handleCopy"></el-input>
      </div>
      <span class="mt-12">
        <el-button type="primary" :disabled="!time2" @click="toTime1" class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
          &lt;
        </el-button>
        <el-button type="primary" :disabled="!time" @click="toTime2" class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
          &gt;
        </el-button>
      </span>
      <div>
        <el-date-picker
          class="mb-4"
          v-model="time2"
          type="datetime"
          placeholder="请选择日期时间"
        />
        <el-input v-model="time2" type="textarea"></el-input>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import moment from 'moment'
import xutils from 'xutils'
import { ElMessage } from 'element-plus'

const time = ref('1693895662944')
const time2 = ref('')
const unit = ref('s')
// 转时间戳
const toTime1 = () => {
  let value = moment(time2.value).valueOf()
  if (unit.value === 'ms') {
    value = value / 1000
  }
  time.value = value + ''
}
// 转时间
const toTime2 = () => {
  let value = +time.value
  if (unit.value === 'ms') {
    value = value * 1000
  }
  time2.value = moment(value).format('YYYY-MM-DD HH:mm:ss')
}
const handleCopy = () => {
  time.value && xutils.copyText(time.value)
  ElMessage({
    message: '复制成功',
    type: 'success',
  })
}
</script>
