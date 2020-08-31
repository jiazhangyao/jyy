import { RouteConfig } from 'vue-router';

export const forbidden: RouteConfig[] = [
  {
    path: 'forbidden', // 禁言用户
    name: 'manageForbidden',
    meta: {
      isLogin: true,
      title: '禁言用户'
    },
    component: () => import(/* webpackChunkName: "manage" */ '@/views/Manage/Forbidden/Index.vue')
  }
];
