import { RouteConfig } from 'vue-router';

const title: string = '用户组';
const name: string = 'userGroupList';

export const userGroup: RouteConfig[] = [
    {
        path: 'usergrouplist', // 用户组列表
        name,
        meta: {
            isLogin: true,
            title
        },
        component: () => import(/* webpackChunkName: "userGroup" */ '../../views/Setting/UserGroup/Index.vue')
    },
    {
        path: 'usergroupadd', // 添加用户组
        name: 'userGroupAdd',
        meta: {
            isLogin: true,
            title: '添加用户组',
            levels: 3,
            father: {
                title,
                name
            }
        },
        component: () => import(/* webpackChunkName: "userGroup" */ '../../views/Setting/UserGroup/Add.vue')
    },
    {
        path: 'usergroupedit', // 编辑用户组
        name: 'userGroupEdit',
        meta: {
            isLogin: true,
            title: '编辑用户组',
            levels: 3,
            father: {
                title,
                name
            }
        },
        component: () => import(/* webpackChunkName: "userGroup" */ '../../views/Setting/UserGroup/Edit.vue')
    }];


