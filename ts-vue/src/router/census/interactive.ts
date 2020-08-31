import { RouteConfig } from 'vue-router';

export const interactive: RouteConfig[] = [
  {
    path: 'interactive', // 互动统计
    name: 'censusInteractive',
    meta: {
      isLogin: true,
      title: '互动统计'
    },
    component: () => import(/* webpackChunkName: "census" */ '@/views/Census/Interactive/Index.vue')
  }
];
