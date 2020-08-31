import { RouteConfig } from 'vue-router';
export const assistant: RouteConfig = {
    path: '/assistant', // 辅导老师直播页
    meta: {
        isLogin: true,
        title: '辅导老师直播'
    },
    component: () => import(/* webpackChunkName: "assistant" */ '@/views/Assistant/Index.vue')
};
