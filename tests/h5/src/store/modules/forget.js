import { stepOne, stepTwo, stepThree } from "../../service/user";
import { Toast } from "vant";
export default {
  namespaced: true,
  state: {
    step: "one",
    phoneNumber: "",
    isCountdown: false,
    isShowCaptcha: false,
    isShowCaptcha1: false,
  },
  mutations: {
    setStep(state, data){
      state.step = data
    },
    setPhoneNumber(state, data){
      state.phoneNumber = data
    },
    setIsCountdown(state, data){
      state.isCountdown = data
    },
    setIsShowCaptcha(state, data){
      state.isShowCaptcha = data;
    },
    setIsShowCaptcha1(state, data){
      state.isShowCaptcha1 = data;
    },
  },
  actions: {
    async step1 ({ commit }, params) {
      const { success, data, msg, errorCode } = await stepOne(params);
      if(success){
        commit("setStep", "two");
        commit("setPhoneNumber", data);
        commit("setIsCountdown", true);
      }else if([10021, 10023, 10038, 10040, 10041, 10018, 10029].indexOf(+errorCode) > -1){
        commit("setIsShowCaptcha", true);
      }else{
        Toast(msg);
      }
    },
    async step2 ({ commit }, params) {
      const { success, data, msg, errorCode } = await stepTwo(params);
      if(success){
        Toast("验证成功");
        commit("setStep", "three");
      }else if([10021, 10023, 10038, 10040, 10041, 10018, 10029].indexOf(+errorCode) > -1){
        commit("setIsShowCaptcha1", true);
      }else{
        Toast(msg);
      }
    },
    async step3 ({ commit }, params) {
      const { success, data, msg } = await stepThree(params);
      if(success){
        commit("setStep", "four");
      }else{
        Toast(msg);
      }
    },
  }
}
