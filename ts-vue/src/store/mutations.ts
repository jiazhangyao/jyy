import { MutationTree } from 'vuex';
import { TEACHER_HEADERIMG, ASSISTANT_HEADERIMG } from '@/config/liveConfig';

const mutations: MutationTree<State> = {
  // jwt字符串payload中的sub
  userInfo: (state, data) => state.userInfo = data,
  admins: (state, data) => state.admins = data,
  headerImg: (state, data) => {
    if (typeof data === 'string' && data !== '') {
      state.headerImg = data;
    } else {
      switch (state.userInfo.role) {
        case 'SPEAKER':
          state.headerImg = TEACHER_HEADERIMG;
          break;
        case 'HELPER':
          state.headerImg = ASSISTANT_HEADERIMG;
          break;
      }
    }
  }
};
export default mutations;
