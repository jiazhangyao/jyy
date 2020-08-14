import { AccountLogin, CodeLogin } from "../../service/user";
import { Ticket, BaseInfo, BusinessBaseInfo } from "../../service/common";
import { toBase64 } from "../../utils/utils.js";
import { Toast } from "vant";
import router from "../../router";
export default {
  namespaced: true,
  state: {
    loginStatus: false,
    imgCodeError: "",
    isShowAccountCaptcha: false,
    isShowCodeCaptcha: false,
    nextPage: {name:'home'} // 登录后跳转的页面，默认为home页
  },
  mutations: {
    setNextPage(state, data) {
      state.nextPage = data;
    },
    setLoginStatus(state, data) {
      state.loginStatus = data;
    },
    setIsShowAccountCaptcha(state, data) {
      state.isShowAccountCaptcha = data;
    },
    setIsShowCodeCaptcha(state, data) {
      state.isShowCodeCaptcha = data;
    }
  },
  actions: {
    async accountLogin({ state, commit, rootState }, params) {
      const { success, errorCode, msg, data } = await AccountLogin(params);z
      if (success) {
        window.localStorage.setItem('userType', data.accountDTO.sourceType);
        const { accountDTO: { sourceType, identity, name, id, accountInfoDTO: { faceVerificationStatus, faceErrorCount } } } = data;
        if (faceVerificationStatus === '2') {
          this.dispatch('login').then(res =>{
            if (res.success) {
              commit("setLoginStatus", true);
              router.push(state.nextPage);
            }
          })
        } else {
          if (faceErrorCount < 5) {
            router.push({
              path: `/certificationh5?registerUser=100&accountId=${id}&identity=${identity}&sourceType=${sourceType}&name=${name}`,
              query: {
                from: "h5"
              }
            });
          } else {
            Toast('对不起，人脸识别失败次数已超过5次，请前往不动产中心进行办理!');
            return;
          }
        }
      } else if ([10021, 10023, 10038, 10040, 10041, 10018, 10029].indexOf(+errorCode) > -1) {
        commit("setIsShowAccountCaptcha", true)
      } else {
        Toast(msg);
      }
    },
    async codeLogin({ state, commit }, params) {
      const { success, errorCode, msg, data } = await CodeLogin(params);
      if (success) {
        window.localStorage.setItem('userType', data.accountDTO.sourceType);
        if (rootState.transfer.hrefsOrderId) {
          this.dispatch("login").then(res => {
            if (res) {
              router.push('transfer/list')
            }
          });
        } else {
          const { accountDTO: { sourceType, identity, name, id, accountInfoDTO: { faceVerificationStatus} } } = data;
          if (faceVerificationStatus === '2') {
            this.dispatch("login").then(()=>{
              commit("setLoginStatus", true);
              router.push(state.nextPage);
            });
          }
          else {
            router.push({
              path: `/certificationh5?registerUser=100&accountId=${id}&identity=${identity}&sourceType=${sourceType}&name=${name}`,
              query: {
                from: "h5"
              }
            });
          }
        }
      } else if ([10021, 10023, 10038, 10040, 10041, 10018, 10029].indexOf(+errorCode) > -1) {
        commit("setIsShowCodeCaptcha", true)
      } else {
        Toast(msg);
      }
    }
  }
}
