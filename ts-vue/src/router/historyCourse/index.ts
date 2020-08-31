import { RouteConfig } from 'vue-router';

export const historyCourse: RouteConfig = {

    path: '/historyCourse', // 老师排课
    name: 'historyCourse',
    meta: {
      // isLogin: true,
      title: '历史课程'
    },
    component: () => import(/* webpackChunkName: "barrage" */ '@/views/HistoryCourse/Index.vue')

};
