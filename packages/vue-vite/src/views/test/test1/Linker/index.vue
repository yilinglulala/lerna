<template>
  <YlMainPanel :title="123">
    <el-button @click="handleAdd">添加</el-button>
    <el-button @click="handleEdit">编辑</el-button>
    <!-- 添加连接器抽屉 -->
    <add v-model:visible="addVisible" />
    <router-view />
  </YlMainPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import add from './add.vue'
const addVisible = ref(false)
const handleAdd = () => {
  addVisible.value = true
}

const router = useRouter()
const handleEdit = () => {
  router.push({ name: 'LinkerEdit' })
}
</script>

<style scoped></style>
