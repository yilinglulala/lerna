<template>
  <el-button text @click="dialog = true">
    Open Drawer with nested form
  </el-button>

  <el-drawer
    ref="drawerRef"
    v-model="dialog"
    title="详情"
    :before-close="handleClose"
    direction="rtl"
    class="demo-drawer"
  >
    <div class="demo-drawer__content">
      <el-form :model="form">
        <el-form-item label="Prop" :label-width="formLabelWidth">
          <el-input v-model="form.prop" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Label" :label-width="formLabelWidth">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="sortable" :label-width="formLabelWidth">
          <el-switch
            v-model="form.sortable"
            active-value="custom"
            :inactive-value="false"
          ></el-switch>
        </el-form-item>
        <el-form-item label="filters" :label-width="formLabelWidth">
          <el-switch
            v-model="form.sortable"
            active-value="custom"
            :inactive-value="false"
          ></el-switch>
        </el-form-item>
        <el-form-item label="Label" :label-width="formLabelWidth">
          <el-radio-group v-model="form.renderType" class="ml-4">
            <el-radio label="default" size="large">default</el-radio>
            <el-radio label="formatter" size="large">formatter</el-radio>
            <el-radio label="renderCell" size="large">renderCell</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">Cancel</el-button>
        <el-button type="primary" :loading="loading" @click="onClick">
          {{ loading ? 'Submitting ...' : 'Submit' }}
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { ElDrawer, ElMessageBox } from 'element-plus'

const props = defineProps(['dialog', 'detail'])
const emit = defineEmits(['update:dialog', 'edit'])

const formLabelWidth = '80px'
let timer

// const dialog = ref(false)
const dialog = computed(() => props.dialog)

const loading = ref(false)

const form = reactive({
  prop: '',
  label: '',
})
const mydetail = computed(() => ({ ...props.detail }))
watch(mydetail, (detail) => {
  Object.assign(form, detail)
})

const drawerRef = ref<InstanceType<typeof ElDrawer>>()
const onClick = () => {
  // 关闭之前保存数据 todo
  emit('edit', form)
  emit('update:dialog', false)
  // drawerRef.value!.close()
}
const handleClose = (done) => {
  if (loading.value) {
    return
  }
  emit('update:dialog', false)
}

const cancelForm = () => {
  loading.value = false
  emit('update:dialog', false)
  clearTimeout(timer)
}
</script>
