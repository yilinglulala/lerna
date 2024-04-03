<!-- 添加连接器 -->
<template>
  <el-drawer
    v-model="visible"
    title="创建连接器"
    direction="rtl"
    :before-close="handleClose"
  >
    <el-form>
      <el-form-item></el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['visible'])
const emits = defineEmits(['update:visible', 'confirm'])
const visible = computed({
  get() {
    return props.visible
  },
  set(v) {
    emits('update:visible', v)
  },
})

const handleClose = (done: any) => {
  done()
}
const handleCancel = () => {
  visible.value = false
}
const handleConfirm = () => {
  emits('confirm')
}
</script>

<style scoped></style>
