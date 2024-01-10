<template>
  <div class="dashboard-container">
    <!-- 时间 -->
    {{ systemTime }}
    <div class="admin-dashboard-time" v-if="systemTime">
      {{ getTimeStr(systemTime, undefined, 8) }} UTC{{ systemTimeOff }}
      <span>|</span>
      {{ $t('@i18n.run.time.yunhangshi') }}: {{ formatMinute(launchTime / 1000, true) }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { getTimeStr } from '@/utils/tools/time'

import { ref } from 'vue'
let systemTime = ref(1704864548890)
let systemTimeOff = ref('')



</script>

<style lang="scss"></style>
