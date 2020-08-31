import { RouteConfig } from 'vue-router';

export const barrage: RouteConfig[] = [
  {
    path: 'barrage', // 弹幕
    name: 'manageBarrage',
    meta: {
      isLogin: true,
      title: '弹幕管理'
    },
    component: () => import(/* webpackChunkName: "manage" */ '@/views/Manage/Barrage/Index.vue')
  }
];
