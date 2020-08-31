import {isLogin} from '@/common/js/auth';
import VueRouter from 'vue-router';
import {getLocalStorage} from "@/common/js/localStorage";
import {decodeJWTsub} from '@/common/js/jwt';
import store from '@/store/store';

/**
 * 路由前卫，基本设置
 */
export default function configRouter(router: VueRouter): void {
  router.beforeEach((to, from, next) => {
    // 判断是否登录
    if (!isLogin() && to.meta.isLogin) {
      router.push({path: '/login'});
      return;
    }

    const token: any = getLocalStorage('token', false);

    if (token) {
      const jwt: any = decodeJWTsub(token);
      if (jwt) {
        const userInfo: any = {
          username: jwt.username,
          name: jwt.name,
          id: jwt.id,
          authors: jwt.dataId,
          roleId: jwt.roleId ? jwt.roleId : 0,
          role: jwt.role ? jwt.role : 'OTHER'
        };
        console.log(jwt);
        store.commit('userInfo', userInfo);
      }
    }
    next();
    // // 访问权限控制
    // const name: string = to.name ? to.name : '';
    // if (name) {
    //   if (!routerAuthor(name)) {
    //     router.push({path: '/home'});
    //   } else {
    //     matomo.swiperURL(to.path, to.meta.title);
    //     next();
    //   }
    // }

  });
}
