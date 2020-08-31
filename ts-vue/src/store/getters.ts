import { GetterTree } from 'vuex';

const getters: GetterTree<State, RootState> = {
  admins: state => state.admins,
  userInfo: state => state.userInfo,
  headerImg: state => state.headerImg
};

export default getters;
