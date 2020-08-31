import { ActionTree } from 'vuex';

import { getAdmins } from '@/server/setting/user';
import { getHeader } from '@/server/login/index';
import { getLocalStorage } from "@/common/js/localStorage";

const actions: ActionTree<State, RootState> = {
  admins: context => {
    getAdmins().then((rs: any) => {
      context.commit('admins', rs.data.retval);
    }).catch((err: any) => {
      console.log('拉取管理员异常！');
    });
  },
  getHeaderImg: context => {
    getHeader().then(res => {
      if (res.data.retval.avatars) {
        context.commit('headerImg', res.data.retval.avatars);
      } else {
        context.commit('headerImg', '');
      }
    }).catch(err => {
      context.commit('headerImg', '');
    });
  }
};

export default actions;
