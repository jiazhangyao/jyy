import { RouteConfig } from 'vue-router';

export const login: RouteConfig = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: () => import(/* webpackChunkName: "index" */ '../../views/Login/Index.vue')
};
