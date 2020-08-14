import { logout, baseinfo, resetmobile, resetpassword, messageStatusCount } from "../../service/user";
import { Toast } from "vant";
import router from "../../router";
export default {
  namespaced: true,
  state: {
    resetMobileStep: "one",
    resetPasswordStep: "one",
    baseinfo: {},
    isShowCaptcha: false,
    userTotalInfo: {}
  },
  mutations: {
    setResetMobileStep(state, data) {
      state.resetMobileStep = data;
    },
    setResetPasswordStep(state, data) {
      state.resetPasswordStep = data;
    },
    setBaseinfo(state, data) {
      state.baseinfo = data;
    },
    setIsShowCaptcha(state, data){
      state.isShowCaptcha = data;
    },
    setUserTotalInfo(state, data) {
      state.userTotalInfo = data;
    }
  },
  actions: {
    async logOut({ commit }) {
      const { success, data, msg } = await logout();
      if (success) {
        commit("setBaseinfo", {});
        commit("base/setUserBaseInfo", {});
        window.sessionStorage.clear();
        window.localStorage.clear();
        router.push("/login");
      } else {
        Toast(msg);
      }
    },
    async getBaseinfo({ commit }) {
      const userType = window.localStorage.getItem('userType');
      const { success, data, msg } = await baseinfo(userType);
      if (success) {
        commit("setBaseinfo", data);
      } else {
        commit("setBaseinfo", {});
        router.push("/login");
      }
    },
    async resetMobile({ commit }, params) {
      const { success, data, msg } = await resetmobile(params);
      if (success) {
        commit("setResetMobileStep", "three")
      } else {
        Toast(msg);
      }
    },
    async resetPassword({ commit }, params) {
      const { success, data, msg } = await resetpassword(params);
      if (success) {
        commit("setResetPasswordStep", "three")
      } else {
        Toast(msg);
      }
    }
  }
};
