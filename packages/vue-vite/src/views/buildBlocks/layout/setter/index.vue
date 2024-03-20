<template>
  <el-drawer
    v-model="visible"
    title="设置器"
    direction="rtl"
    :modal="false"
    size="100%"
    modal-class="setter-modal"
  >
    <span>{{ detail.text }}</span>
    <el-form :model="detail">
      <el-form-item label="文本">
        <el-input v-model="detail.text" />
      </el-form-item>
      <el-form-item label="宽">
        <el-input v-model="detail.style.width" />
      </el-form-item>
      <el-form-item label="高">
        <el-input v-model="detail.style.height" />
      </el-form-item>

      <el-form-item
        v-for="item in detail.containerConfig"
        :label="item.desc"
        :key="item.prop"
      >
        <el-radio-group v-if="item.renderType==='radio-button'" v-model="detail.style[item.prop]">
          <el-radio-button v-for="option in item.options" :label="option.value" :key="option.value">{{option.label}}</el-radio-button>
        </el-radio-group>
        <el-input v-else v-model="detail.style[item.prop]" />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps(['detail'])
let detail = computed(() => props.detail || {})

let visible = ref(false)
const setVisible = (v: boolean) => {
  visible.value = v
}

defineExpose({
  setVisible,
})
</script>

<style>
.setter-modal {
  margin-left: 70%;
}
</style>
