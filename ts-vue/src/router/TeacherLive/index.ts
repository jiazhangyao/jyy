import { RouteConfig } from 'vue-router';

export const teacherLive: RouteConfig = {
  path: '/teacherLive',
  name: 'teacherLive',
  meta: {
    title: '主讲教师直播端'
  },
  component: () => import(/* webpackChunkName: "teacherLive" */ '../../views/TeacherLive/Index.vue')
};
