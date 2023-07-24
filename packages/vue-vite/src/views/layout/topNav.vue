<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">HHH</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="i18n">
      <router-link to="/i18n">i18n</router-link>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>小工具</template>
      <el-menu-item index="tableCan">
        <router-link to="/tableCan">tableCan</router-link>
      </el-menu-item>
      <el-menu-item index="pdf">
        <router-link to="/pdf">pdf</router-link>
      </el-menu-item>
      <!-- <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu> -->
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>文档</template>
      <el-menu-item index="3-1">
        <router-link to="/tableCan">tableCan</router-link>
      </el-menu-item>
      
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import router from '@/router/index'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string) => {
  console.log(key, keyPath)
  // const router = useRouter()
  router.push({name: key})
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
