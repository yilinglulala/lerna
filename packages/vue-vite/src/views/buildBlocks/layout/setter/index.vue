<template>
  <el-drawer
    v-model="visible"
    title="设置器"
    direction="rtl"
    :modal="false"
    size="100%"
    modal-class="setter-modal"
  >
    <el-form :model="detail" :label-width="80">
      <el-form-item label="文本">
        <el-input v-model="detail.text" />
      </el-form-item>
      <el-form-item
        v-for="item in detail.bindConfig"
        :label="item.desc"
        :key="item.prop"
        
      >
        <el-radio-group
          v-if="item.renderType === 'radio-button'"
          v-model="detail.style[item.prop]"
        >
          <el-radio-button
            v-for="option in item.options"
            :label="option.value"
            :key="option.value"
          >
            {{ option.label }}
          </el-radio-button>
        </el-radio-group>
        <el-select
          v-else-if="item.renderType === 'select'"
          v-model="get(detail, item.target, detail)[item.prop]"
          placeholder="请选择"
        >
          <el-option
            v-for="item in item.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <component :is="item.renderType || 'el-input'" v-else v-model="get(detail, item.target, detail)[item.prop]" />
      </el-form-item>
      <el-form-item
        v-for="item in detail.containerConfig"
        :label="item.desc"
        :key="item.prop"
        
      >
        <el-radio-group
          v-if="item.renderType === 'radio-button'"
          v-model="detail.style[item.prop]"
        >
          <el-radio-button
            v-for="option in item.options"
            :label="option.value"
            :key="option.value"
          >
            {{ option.label }}
          </el-radio-button>
        </el-radio-group>
        <el-select
          v-else-if="item.renderType === 'select'"
          v-model="get(detail, item.target, detail)[item.prop]"
          placeholder="请选择"
        >
          <el-option
            v-for="item in item.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <component :is="item.renderType || 'el-input'" v-else v-model="get(detail, item.target, detail)[item.prop]" />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
// TODO 边距如何设置比较合理
import { get } from 'lodash'
import { computed, ref } from 'vue'

const props = defineProps(['detail'])
let detail = computed(() => props.detail || {})

let visible = ref(false)
const setVisible = (v: boolean) => {
  visible.value = v
}

// 定义暴露，才能在外部访问
defineExpose({
  setVisible,
})
</script>

<style>
.setter-modal {
  margin-left: 70%;
}
</style>
