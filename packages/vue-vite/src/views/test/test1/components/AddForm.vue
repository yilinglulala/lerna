<template>
  <div class="add-form-container">
    <header class="flex">
      <div v-for="(item, key) in configMap" :key="key">{{ item.label }}</div>
    </header>
    <main>
      <div v-for="(data, index) in forms" :key="index">
        <el-form :inline="true" class="flex">
          <el-form-item v-for="(item, key) in configMap" :key="key">
            <el-select v-if="item.type==='el-select'" v-bind="item.bind" v-model="data[key]">
              <el-option
                v-for="(opt, i) in item.options"
                :key="i"
                :label="opt.label"
                :value="opt.value"
              ></el-option>
            </el-select>
            <el-input v-else v-bind="item.bind" v-model="data[key]"></el-input>
            <!-- <component v-else :is="item.type" v-bind="item.bind" v-model="data[key]"> -->
            <!-- </component> -->
          </el-form-item>
          <i @click="handleDel">X</i>
        </el-form>
      </div>
    </main>
    <footer>
      <el-button @click="addRow">添加字段</el-button>
      <el-button @click="reset">重置</el-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash'
import { reactive, defineProps } from 'vue'

type TType = 'el-input' | 'el-select'
interface IItem {
  prop: string
  label: string
  type: TType
  bind?: Record<string, string>
}
interface IItemSelect extends IItem {
  type: 'el-select'
  options: Array<{ value: any; label: string }>
}

let props = defineProps(['config', 'forms'])
const config: Array<IItem | IItemSelect> = props.config
const forms = reactive(props.forms)  

const configMap: any = reactive({})
config.forEach((item) => {
  configMap[item.prop] = item
})
const getDefaultMap: any = {
  'el-select': (item: IItemSelect) => item.options[0].value,
}
const getDefaultForm = () => {
  const res: any = {}
  config.forEach((item) => {
    let { prop, type } = item
    res[prop] = getDefaultMap[type] ? getDefaultMap[type](item) : ''
  })
  return res
}
const defaultForm = getDefaultForm()
// const forms = reactive([cloneDeep(defaultForm)])

// 按钮操作
// 【添加字段】
const addRow = () => {
  forms.push(cloneDeep(defaultForm))
}
// 【重置】
const reset = () => {
  forms[0] = cloneDeep(defaultForm)
  forms.length = 1
}
</script>

<style lang="scss">
.add-form-container {
  .el-form-item {
    margin-right: 0;
    &:not(:first-child) {
      .el-input__wrapper {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    &:not(:last-child) {
      .el-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }
  .el-input,
  .el-select {
    width: 100%;
  }
}
</style>
