<template>
  <div class="p-4">
    <el-button>配置操作栏</el-button>
    <el-button @click="copyData">复制配置</el-button>
    <el-button @click="showResult">显示结果</el-button>
    <!-- 普通列 -->
    <el-table :data="tableData" stripe>
      <el-table-column prop="prop" label="prop" width="180">
        <template #default="scope">
          <el-input v-model="scope.row.prop"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="label" label="label" width="180">
        <template #default="scope">
          <el-input v-model="scope.row.label"></el-input>
        </template>
      </el-table-column>
      <!-- 排序 -->
      <el-table-column label="sortable" width="100">
        <template #default="scope">
          <el-switch
            v-model="scope.row.sortable"
            active-value="custom"
            :inactive-value="false"
          ></el-switch>
        </template>
      </el-table-column>
      <!-- 筛选 -->
      <el-table-column label="filters">
        <template #default="scope">
          <el-switch
            v-model="scope.row.sortable"
            active-value="custom"
            :inactive-value="false"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="filters">
        <template #default="scope">
          <el-radio-group v-model="scope.row.renderType" class="ml-4">
            <el-radio label="default" size="large">default</el-radio>
            <el-radio label="formatter" size="large">formatter</el-radio>
            <el-radio label="renderCell" size="large">renderCell</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
      <!-- 工具栏 -->
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="handlCopy(scope.$index, scope.row)">
            copy
          </el-button>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            Edit
          </el-button>
          <el-button size="small" @click="handlAdd(scope.$index, scope.row)">
            添加
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handlAdd(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
      <!-- add/edit 属性详情弹窗 -->
    </el-table>
    <h2 class="text-2xl font-semibold p-3">操作列</h2>
    <!-- 操作列 -->
    <el-table :data="operateData" stripe>
      <el-table-column prop="prop" label="prop" width="180" />
      <el-table-column prop="label" label="label" width="180" />
      <!-- 工具栏 -->
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="handlCopy(scope.$index, scope.row)">
            copy
          </el-button>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            Edit
          </el-button>
          <el-button size="small" @click="handlAdd(scope.$index, scope.row)">
            添加
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handlAdd(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
      <!-- add/edit 属性详情弹窗 -->
    </el-table>
    <detail
      v-model:dialog="dialog"
      :detail="detail.data"
      @edit="confirmEdit"
      ref="detailRef"
    />
    <!-- 结果弹窗 -->
    <el-dialog
      v-model="resultVisible"
      title="result"
      width="35%"
      
      :before-close="handleClose"
    >
      <el-input type="textarea" v-model="result" :rows ="25"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resultVisible = false">Cancel</el-button>
          <el-button type="primary" @click="resultVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import Detail from './detail.vue'
import { reactive, ref } from 'vue'
import { cloneDeep } from 'lodash'
const result = ref('')
const resultVisible = ref(false)
const showResult = () => {
  result.value = beforeSave()
  resultVisible.value = true
}
// 保存配置前数据转化
const beforeSave = () => {
  const  data = cloneDeep(tableData)
  data.forEach((v) => {
    handleSortable(v)
    handleRenderType(v)
  })
  let str = JSON.stringify(data, undefined, 4)
  console.log(11, str)
  return str
}
const handleRenderType = (v) => {
  let obj = {
    formatter: '(row, param) => {}',
    renderCell: '(h, param, row) => {}',
  }
  for (let renderType in obj) {
    if(renderType !== v.renderType) {
      delete v[renderType]
    }
  }
  if (obj[v.renderType]) {
    v[v.renderType] = obj[v.renderType]
  }
  delete v.renderType
}
const handleSortable = (v) => {
  if (!v.sortable) {
    delete v.sortable
  }
}

const tableData = reactive([
  {
    prop: 'key1',
    label: 'value',
    sortable: false,
    filters: [],
    renderType: 'default',
  },
])
const operateData = reactive([
  {
    prop: 'key',
    label: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
// 【复制】
const handlCopy = (i, data) => {
  tableData.push({ ...data })
}

// 详情
const activeIndex = ref(0)
const dialog = ref(false)
const detail = reactive({ data: {} })
const detailRef = ref()
// 【点击编辑】
const handleEdit = (i, data) => {
  dialog.value = true
  detail.data = { ...data }
  activeIndex.value = i
}
// 【详情点击确认】
const confirmEdit = (data) => {
  tableData[activeIndex.value] = data
}

const copyData = () => {}
</script>
