import { RouteConfig } from 'vue-router';

export const live: RouteConfig[] = [
  {
    path: 'live', // 直播统计
    name: 'manageLive',
    meta: {
      isLogin: true,
      title: '弹幕管理'
    },
    component: () => import(/* webpackChunkName: "Census" */ '@/views/Census/Live/Index.vue')
  }
];
