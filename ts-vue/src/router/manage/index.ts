import { RouteConfig } from 'vue-router';
import { barrage } from './barrage';
import { forbidden } from './forbidden';
import { keyword} from './keyword';
export const manage: RouteConfig = {
  path: '/manage',
  name: 'manage',
  meta: {
    title: '管理'
  },
  component: () => import(/* webpackChunkName: "manage" */ '../../views/Manage/Index.vue'),
  redirect: '/manage/keyword',
  children: [
    ...barrage,
    ...forbidden,
    ...keyword
  ]
};
