import { createRouter, createWebHashHistory } from 'vue-router'
// import Nav from '../views/nav.vue'
const routes = [
  {
    path: '/',
    component: () => import('../views/nav.vue'),
    redirect: '/i18n',
    children: [
      {
        path: '/i18n',
        name: 'i18n',
        component: () => import('../views/smallTool/i18n.vue'),
      },
      {
        path: '/moment',
        name: 'moment',
        component: () => import('../views/smallTool/moment/index.vue'),
      },
      {
        path: '/tablecan',
        name: 'tableCan',
        component: () => import('../views/smallTool/tableCan/index.vue'),
      },
      {
        path: '/pdf',
        name: 'pdf',
        component: () => import('../views/smallTool/pdf/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
export default router
