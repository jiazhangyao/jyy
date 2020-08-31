import { RouteConfig } from 'vue-router';
import { live } from './live';
import { interactive } from './interactive';
export const census: RouteConfig = {
  path: '/census',
  name: 'census',
  meta: {
    title: '统计'
  },
  component: () => import(/* webpackChunkName: "Census" */ '../../views/Census/Index.vue'),
  // redirect: '/census/barrage',
  children: [
    ...live,
    ...interactive
  ]
};
