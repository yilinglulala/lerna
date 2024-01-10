
const routes: Array<any> = [

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/layout/Login.vue'),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/layout/Main.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/pages/dashboard/index.vue'),
      },
    ]
  },
  
  // path: '/',
  // redirect: '/login',
  // component: () => import('@/views/layout/Login.vue'),
  //   children: [
  //     {
  //       path: '/login',
  //       name: 'login',
  //       component: () => import('@/views/login/index.vue')
  //     },
  //     {
  //       path: '/forget',
  //       name: 'forget',
  //       component: () => import(/* webpackChunkName: 'forget' */ '@/views/login/Forget.vue')
  //     },
  //     {
  //       path: '/noPermission',
  //       name: 'noPermission',
  //       component: () => import(/* webpackChunkName: 'noPermission' */ '@/views/layout/components/NoPermission.vue')
  //     }
  //   ]
  // },
  // ...Admin,
  // { path: '*', component: () => import('@/views/layout/components/404.vue') }

];

export default routes