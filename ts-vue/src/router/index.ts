import Vue from 'vue';
import Router from 'vue-router';
import { login } from './login/index';
import { manage } from './manage/index';
import { census } from './census/index';
import { teacherLive } from './TeacherLive/index';
import { setting } from './setting/index';
import { assistant } from './assistant/index';
import { course } from './Course/index';
import { historyCourse } from './historyCourse/index';

// //\ 屏蔽相同路由时报错
const originalPush: any = Router.prototype.push;
Router.prototype.push = function push(location: any): any {
  // @ts-ignore
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

export const router: Router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/course'
      // meta: {
      //   title: '首页',
      //   isLogin: true
      // },
      // component: () => import(/* webpackChunkName: "notFound" */ '../views/Home/Index.vue')
    },
    {
      path: '/updatepassword',
      name: 'updatePassword',
      meta: {
        title: '修改密码'
      },
      component: () => import(/* webpackChunkName: "updatePassword" */ '../views/UpdatePassword.vue')
    },
    login,
    setting,
    manage,
    census,
    teacherLive,
    assistant,
    course,
    historyCourse
    // {
    //   path: '/notfound',
    //   name: 'notFound',
    //   meta: {
    //     title: '404'
    //   },
    //   component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound/Index.vue')
    // },
    // {
    //   path: '*',
    //   name: 'not',
    //   component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound/Index.vue')
    // }
  ]
});
