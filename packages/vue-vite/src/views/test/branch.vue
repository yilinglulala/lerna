<template>
  <section>
    <div>
      <el-button @click="addBrach">分支 +</el-button>
    </div>
    <!-- <div class="line-container">
      <div class="line1"></div>
      <div class="line" v-for="i in len" :key="i" ></div>
    </div> -->
    <div class="flex-column">
      <div
        class="start-line"
        :style="`margin-right: ${280 + 328 * lastNum}px`"
      ></div>
      <div class="inline-flex branch-container">
        <div class="branch" v-for="(branch, index) in branchs" :key="index">
          <template v-for="(item, i) in branch" :key="item.name">
            <Branch
              v-if="item.branch && item.branch.length"
              :data="item.branch"
            />
            <card
              v-else
              :type="item.type || 'branch'"
              :data="item"
              @del="() => handleDel(branch, i, index)"
            />
          </template>
        </div>
      </div>
      <div
        class="end-line"
        :style="`margin-right: ${280 + 328 * lastNum}px`"
      ></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import Card from './card.vue'
import Branch from './branch.vue'
import { isArray } from 'lodash'
import { last } from 'lodash'
import { ElFormItem } from 'element-plus'

let props = defineProps(['data'])
let data = computed(() => props.data)
// let branch1 = [[1], [1, 2, [1, 3, 1]]]
let branchs = reactive(
  data.value || [
    [{ name: 11 }],
    [
      { name: 21 },
      {
        name: 22,
        type: 'action',
        branch: [
          [
            {
              name: 221,
              branch: [
                [{ name: 221.1 }, { name: 221.11, type: 'action' }],
                [{ name: 221.2 }],
              ],
            },
            { name: 222, type: 'action' },
          ],
          [
            {
              name: 223,
              branch: [
                [{ name: 223.1 }, { name: 223.11, type: 'action' }],
                [{ name: 223.2 }],
              ],
            },
          ],
        ],
      },
      {
        name: 23,
        type: 'action',
        // branch: [
        //   [{ name: 23.1 }, { name: 23.11, type: 'action' }],
        //   [{ name: 23.2 }],
        // ],
      },
    ],
  ],
)
let len = computed(() => branchs.length - 1)

const lastNum = ref(0)
let lastData = branchs[branchs.length - 1]
let a = lastData.find((item: any) => item.branch)
if (a) {
  lastNum.value = a.branch.length - 1
}

const getBranchW = (branchs: any[]) => {
  let i = 0
  branchs.forEach((branch) => {
    let items = branch.filter((v) => v.branch)
    if (items.length) {
      i += branch.length - items.length
      items.forEach((v) => {
        i += getBranchW(v.branch)
      })
    } else {
      i += 1
    }
  })
  console.log('name', branchs[0][0].name, 'i', i)
  return i
}
console.log('getBranchW', getBranchW([lastData]))
// 删除卡片
const handleDel = (branch, i, index) => {
  if (branch.length === 1) {
    branchs.splice(index, 1)
  } else {
    branch.splice(i, 1)
  }
}
// 添加分支
const addBrach = () => {
  branchs.push([{}])
  lastNum.value = 0
}
</script>

<style lang="scss" scoped>
.start-line {
  margin-left: 31px;
  margin-right: 280px;
  height: 56px;
  border-left: 1px solid;
  // border-bottom: 1px solid;
}
.end-line {
  margin-left: 31px;
  margin-right: 280px;
  height: 56px;
  border-left: 1px solid;
  // border-top: 1px solid;
}
$l1: 24px;
$h: 58px;
$left: 32px;
.line-container {
  position: relative;
  display: inline-flex;
  margin-top: $l1;
  margin-left: $left;
  margin-bottom: -6px;
  .line1 {
    position: absolute;
    top: -$l1;
    height: $l1 + $h;
    border-right: 1px solid;
  }
  .line {
    display: inline-block;
    width: 328px;
    height: $h;
    border-top: 1px solid;
    border-right: 1px solid;
  }
}
.branch-container {
  // &::before {
  //   content: '';
  //   display: block;
  //   width: 100%;
  //   height: 36px;
  //   background: #000;
  // }
}
.branch {
  display: flex;
  flex-direction: column;
  margin-right: 16px;

  &:last-child,
  .branch:last-child {
    margin-right: 0;
  }
  &::before {
    content: '';
    width: calc(100% + 16px);
    min-height: 52px;
    border-left: 1px solid;
    margin-left: 31px;
    margin-right: -32px;
  }
  &:not(:last-child)::before {
    border-top: 1px solid;
  }
  &::after {
    content: '';
    width: calc(100% + 16px);
    height: 100%;
    margin-left: 31px;
    border-left: 1px solid;
  }
  &:not(:last-child)::after {
    border-bottom: 1px solid;
  }
}
</style>
