import { RouteConfig } from 'vue-router';

export const keyword: RouteConfig[] = [
  {
    path: 'keyword', // 敏感词
    name: 'manageKeyword',
    meta: {
      isLogin: true,
      title: '敏感词'
    },
    component: () => import(/* webpackChunkName: "manage" */ '@/views/Manage/Keyword/Index.vue')
  }
];
