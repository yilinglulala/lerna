<template>
  <div class="main-container">
    <el-container>
      <el-header>Header</el-header>
      <el-container class="main-bottom">
        <el-aside width="256px">Aside</el-aside>
        <el-main class="main-content">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss">
.main-container {
  .main-bottom {
    height: calc(100vh - 60px);
    background: var(--color-background-bg);
  }
  .main-content {
    margin: var(--vt-space-normal);
    background: var(--color-background);
  }
}
</style>
