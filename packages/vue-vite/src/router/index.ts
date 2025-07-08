import { createRouter, createWebHashHistory } from 'vue-router'
// import Nav from '../views/nav.vue'
export const routes = [
  {
    path: '/buildBlocks',
    name: 'buildBlocks',
    component: () => import('../views/buildBlocks/index.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test/index.vue'),
  },
  {
    path: '/test1',
    name: 'test1',
    component: () => import('../views/test/test1/index.vue'),
    meta: {
      title: 'Link'
    },
    children: [
      {
        path: '/Linker/Edit',
        name: 'LinkerEdit',
        component: () => import('../views/test/test1/Linker/edit/index.vue'),
      },
    ]
  },
  {
    path: '/',
    component: () => import('../views/nav.vue'),
    redirect: '/tablecan',
    meta: {
      isTool: true
    },
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
      {
        path: '/topo',
        name: 'topo',
        component: () => import('../views/smallTool/topo/index.vue'),
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
