import { createRouter, createWebHashHistory } from 'vue-router'
// import Nav from '../views/nav.vue'
const routes = [
  { path: '/', component: ()=>import('../views/nav.vue') },
  { path: '/i18n', component: ()=>import('../views/smallTool/i18n.vue') }
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
export default router

