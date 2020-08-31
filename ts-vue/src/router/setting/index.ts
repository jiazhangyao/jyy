import { RouteConfig } from 'vue-router';
import { userGroup } from './userGroup';
import { user } from './user';

export const setting: RouteConfig = {
    path: '/setting', // 用户组
    meta: {
        isLogin: true,
        title: '系统设置'
    },
    component: () => import(/* webpackChunkName: "setting" */ '@/views/Setting/Index.vue'),
    redirect: '/setting/userlist',
    children: [
        ...userGroup,
        ...user
    ]
};
