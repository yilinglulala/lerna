<template>
  <div class="node-add-container">
    <el-popover
      placement="right"
      :width="280"
      trigger="hover"
      content="this is content, this is content, this is content"
    >
      <template #reference>
        <div>+</div>
      </template>
      <div>
        <div>执行动作</div>
        <div>添加流组件</div>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.node-add-container {
  position: relative;
  display: flex;
  width: 24px;
  height: 66px;
  align-items: center;
  margin-left: 20px;
  > div {
    position: absolute;
    width: 100%;
    height: 24px;
    background: #fff;
    border-radius: 50%;
    text-align: center;
  }
  &::before {
    content: '';
    position: absolute;
    width: 50%;
    height: 100%;
    border-right: 1px solid;
  }
}
</style>
