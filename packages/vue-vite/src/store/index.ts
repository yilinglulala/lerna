import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
// export const useSourceCodeStore = defineStore('sourceCode', {
//   // 其他配置...
//   state: () => ({ count: 0 }),
//   getters: {
//     double: (state) => state.count * 2,
//   },
//   actions: {
//     increment() {
//       this.count++
//     },
//   },
// })

export const useSourceCodeStore = defineStore('sourceCode', () => {
  const code = ref('')
  const getCode = computed(() => code.value)
  function setCode(v: string) {
    code.value = v
  }

  return { code, setCode, getCode }
})