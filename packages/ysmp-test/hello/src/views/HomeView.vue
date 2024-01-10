<script setup lang="ts">
import router from '@/router/index'
// import TheWelcome from '../components/TheWelcome.vue'
let haslogin = true
if (!haslogin) {
  router.push({name: 'login'})
} else {
  router.push({name: 'dashboard'})
}
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
  </main>
</template>
