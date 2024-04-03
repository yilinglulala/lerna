<!-- 连接器 - 鉴权设置 -->
<template>
  <div class="main">
    <div class="title-18">鉴权设置</div>
    <div class="tip">鉴权用于校验用户是否有权限访问接口</div>
    <div>
      <span>选择鉴权方式</span>
      <el-select v-model="authWay">
        <el-option
          v-for="item in authOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="text" @click="useAuth">使用已有鉴权</el-button>
      <el-button type="text">使用UC鉴权模板</el-button>
    </div>
    <!-- 鉴权设置 -->
    <div class="b-b">
      <span class="title-18">无鉴权设置</span>
      <span class="tip">根据自定义鉴权字段换取的 Token 值进行鉴权验证</span>
      <el-button type="text">查看文档</el-button>
    </div>
    <!-- 设置鉴权字段 -->
    <div class="title-18">设置鉴权字段</div>
    <div class="tip">自定义鉴权字段，例如username用户名和password密码</div>
    <el-steps :active="activeStep" align-center>
      <el-step title="设置鉴权字段" />
      <el-step title="设置token请求接口" />
      <el-step title="设置鉴权请求参数" />
      <el-step title="鉴权调试" />
    </el-steps>
    <span v-show="activeStep === 1">
      <!-- 字段列表 -->
      <AddForm :config="authFieldConfig" :forms="forms" />
      <!-- 用户预览 -->
      <!-- todo -->
    </span>
    <!-- 设置Token请求接口 -->
    <div class="title-18">设置Token请求参数</div>
    <div class="tip">
      支持使用自定义域名和连接器模板域名，只有在配置了连接器域名模板时才可以使用连接器模板域名。
    </div>
    <el-button @click="FormulaEditorVisible = true">公式编辑</el-button>

    <!-- 使用已有鉴权弹窗 -->
    <Dialog v-model="useAuthVisible" title="使用已有鉴权" width="500">
      <el-input v-model="useAuthId" />
    </Dialog>
    <!-- 公式编辑 -->
    <FormulaEditor v-model:visible="FormulaEditorVisible" :data="fieldData" />
    <!-- 底部 -->
    <footer class="main-footer">
      <el-button v-show="activeStep > 1" @click="handlePre">上一步</el-button>
      <el-button v-show="activeStep < 4" @click="handleNext">下一步</el-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import AddForm from '../../components/AddForm.vue'
import Dialog from '../../components/Dialog.vue'
import FormulaEditor from '../../components/FormulaEditor.vue'
// 鉴权方式
const authWay = ref('none')
const authOptions = [
  { value: 'none', label: '无鉴权' },
  { value: 'token', label: 'Token鉴权' },
]
// 使用已有鉴权
const useAuthId = ref('')
const useAuthVisible = ref(false)
const useAuth = () => {
  useAuthVisible.value = true
}

const authFieldConfig = [
  {
    prop: 'key',
    label: '字段key',
    type: 'el-input',
    bind: { placeholder: '请输入' },
  },
  { prop: 'title', label: '字段标题', type: 'el-input' },
  {
    prop: 'required',
    label: '是否必填',
    type: 'el-select',
    options: [
      { value: 1, label: '是' },
      { value: 0, label: '否' },
    ],
  },
  {
    prop: 'type',
    label: '展示类型',
    type: 'el-select',
    options: [
      { value: 'string', label: '文本' },
      { value: 'number', label: '数值' },
    ],
  },
  { prop: 'desc', label: '字段说明', type: 'el-input' },
]
const forms = reactive([])

// token 鉴权设置
const activeStep = ref(1)
// 公式编辑
const FormulaEditorVisible = ref(false)
const fieldData = reactive([{key: 'a'}, {key: 'b'}])

/********** 底部操作 **********/
// 【上一步】
const handlePre = () => {
  if (activeStep.value <= 0) {
    return
  }
  activeStep.value--
}
// 【下一步】
const handleNext = () => {
  // if ()
  if (activeStep.value >= 4) {
    return
  }
  activeStep.value++
}
</script>

<style scoped></style>
