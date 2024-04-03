<template>
  <el-dialog v-model="visible" :title="props.title" :width="props.width">
    <slot></slot>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
const props = defineProps(['modelValue', 'title', 'width'])
const emits = defineEmits(['update:modelValue', 'confirm'])

const visible = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  },
})

const handleConfirm = () => {
  emits('confirm')
}
</script>

