<template>
  <el-drawer
    v-model="visible"
    title="I am the title"
    direction="rtl"
    :modal="false"
    size="100%"
    modal-class="setter-modal"
  >
    <span>{{ detail.text }}</span>
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
