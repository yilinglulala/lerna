<template>
  <div>
    {{ code }}
  </div>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useSourceCodeStore } from '@store/index'
const store = useSourceCodeStore()
let { setCode } = store
let code = computed(() => store.code)
</script>
