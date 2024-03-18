const path = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@store': path.resolve('./src/store'),
    }
  },
  css: { 
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/style/mixin.scss" as *;`
      }
    }
  }
})
