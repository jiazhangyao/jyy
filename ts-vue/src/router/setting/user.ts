import { RouteConfig } from 'vue-router';

const title: string = '用户列表';
const name: string = 'userIndex';

export const user: RouteConfig[] = [
    {
        path: 'userlist', // 用户组列表
        name,
        meta: {
            isLogin: true,
            title
        },
        component: () => import(/* webpackChunkName: "user" */ '../../views/Setting/User/Index.vue')
    },
    {
        path: 'useradd', // 添加用户组
        name: 'userAdd',
        meta: {
            isLogin: true,
            title: '添加用户',
            levels: 3,
            father: {
                title,
                name
            }
        },
        component: () => import(/* webpackChunkName: "user" */ '../../views/Setting/User/Add.vue')
    },
    {
        path: 'useredit', // 编辑用组
        name: 'userEdit',
        meta: {
            isLogin: true,
            title: '编辑用户',
            levels: 3,
            father: {
                title,
                name
            }
        },
        component: () => import(/* webpackChunkName: "user" */ '../../views/Setting/User/Edit.vue')
    }];


