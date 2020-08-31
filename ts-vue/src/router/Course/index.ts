import { RouteConfig } from 'vue-router';

export const course: RouteConfig = {
    path: '/course', // 老师排课
    name: 'course',
    meta: {
      // isLogin: true,
      title: '排课'
    },
    component: () => import(/* webpackChunkName: "barrage" */ '@/views/Course/Index.vue')
};
