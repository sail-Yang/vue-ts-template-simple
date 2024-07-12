import { type RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'

export const publicRouters: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页',
      roles: ['admin','cashier']
    },
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/store',
        meta: {
          requiresAuth: true,
          title: '超市库存',
          roles: ['admin']
        },
        component: () => import('../views/Store.vue'),
      },
      {
        path: '/cashier',
        meta: {
          requiresAuth: true,
          title: '收银员信息',
          roles: ['admin']
        },
        component: () => import('../views/Cashier.vue'),
      },
      {
        path: '/sale',
        meta: {
          requiresAuth: true,
          title: '订单结算',
          roles: ['cashier']
        },
        component: () => import('../views/Sale.vue'),
      },
      {
        path: '/product',
        meta: {
          requiresAuth: true,
          title: '商品管理',
          roles: ['admin']
        },
        component: () => import('../views/Product.vue'),
      },
      {
        path: '/result',
        meta: {
          requiresAuth: true,
          title: '订单结果',
          roles: ['cashier']
        },
        component: () => import('../views/Result.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      roles: ['cashier','admin']
    },
    component: Login
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRouters,
})



export default router
