<template>
  <div class="dashboard-container">
    <!-- 时间 -->
    <div class="admin-dashboard-time" v-if="systemTime">
      {{ getTimeStr(systemTime) }} UTC{{ systemTimeOff }}
      <span>|</span>
      {{ $t('@i18n.run.time.yunhangshi') }}: {{ formatMinute(launchTime / 1000, true) }}
    </div>
  </div>
</template>
<script setup lang="ts">
import xutils from 'xutils'
import { ref } from 'vue'
let getTimeStr = xutils.getTimeStr()
let systemTime = ref('')
let systemTimeOff = ref('')

</script>

<style lang="scss"></style>
