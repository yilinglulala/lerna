<template>
  <div @click="selectCard" :class="{ active }">
    <div class="card">
      <div class="t flex space-between">
        <span>1. {{ langMap[type] }} {{data.name}}</span>
        <i v-if="active" class="cursor-pointer" @click="handleDel">X</i>
      </div>
      <div class="b">
        <span v-if="0">
          请选择
          <span>连接器</span>
          和
          <span>触发器</span>
        </span>
        <span v-else>
          <div class="left float-left"></div>
          <div class="right">
            <span>连接器：名称</span>
            <span>触发器：名称</span>
          </div>
        </span>
      </div>
    </div>
    <NodeAdd />
  </div>
</template>

<script setup lang="ts">
import { uniqueId } from 'lodash'
import { computed, reactive, ref } from 'vue'
import { useActiveCardStore } from '../../store'
import NodeAdd from './nodeAdd.vue'

const props = defineProps(['type', 'data'])
const emits = defineEmits(['del'])

const id = uniqueId('card-')
let type = computed(() => props.type)
let data = computed(() => props.data || {})

let langMap = {
  linker: '连接器',
  trigger: '触发器',
  action: '执行动作',
  branch: '分支'
}
let typeConfig: any = {
  trigger: {
    needSelect: ['linker', 'trigger'],
  },
}
let config = reactive(typeConfig[type.value])

const handleDel = () => {
  emits('del', id)
}

// 选中高亮
let activeCardStore = useActiveCardStore()
let active = computed(() => activeCardStore.ActiveCard === id)
const selectCard = () => {
  activeCardStore.setActiveCard(id)
}
</script>

<style lang="scss" scoped>
@mixin wh($width) {
  width: $width;
  height: $width;
}
.card {
  width: 312px;
  height: 88px;
  background: #fff;
  border-radius: 4px;
  .t,
  .b > span {
    display: flex;
    align-items: center;
    padding: 0 16px;
  }
  .t {
    height: 36px;
    border-bottom: 1px solid #eee;
  }
  .b {
  }
  .float-left {
    // float: left;
    @include wh(32px);
    background: #ccc;
    border-radius: 4px;
    margin-right: 16px;
  }
  .right {
    display: flex;
    flex-direction: column;
  }
}
.active {
  .card {
    outline: 2px solid skyblue;
  }
}
</style>
