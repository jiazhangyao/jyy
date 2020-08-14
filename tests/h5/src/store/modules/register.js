import { start, passwordConfirm, regInfo, verifyCompanyInfo } from "../../service/user";
import { Toast } from "vant";
import router from "../../router";

// const sourceType = process.env.VUE_APP_SOURCE_TYPE;

export default {
  namespaced: true,
  state: {
    step: "two",
    verifyCompanyInfosData: {}
  },
  mutations: {
    setLoginStatus(state, data) {
      state.loginStatus = data;
    },
    setStep(state, data) {
      state.step = data;
    },
    changeVerifyCompanyInfos(state, data) {
      state.verifyCompanyInfosData = data
    }
  },
  actions: {
    async step1({ dispatch, commit, state }, params) {
      const { identity, mobile, msgAuthCode, name, password, sourceType } = params;
      const params1 = {
        identity,
        mobile,
        msgAuthCode,
        name,
        sourceType
      };
      const { success, data, msg } = await start(params1);
      if (success) {
        if (data.step == 1) {
          const params2 = {
            taskId: data.task_id,
            previous: false,
            bizData: {
              dto: {
                identity: identity,
                mobile: mobile,
                password,
                name: name,
                sourceType
              }
            }
          };
          const res = await passwordConfirm(params2);
          if (res.success) {
            const { has_task } = res.data;
            if (has_task) {
              const params3 = {
                mobile,
                type: sourceType
              };
              const res2 = await regInfo(params3);
              if (res2.success) {
                if (sourceType === 0) {
                  verifyCompanyInfo({
                      ...state.verifyCompanyInfosData
                  })
                }
                const { id } = res2.data;
                router.push({
                  path: `/certificationh5?registerUser=100&accountId=${id}&identity=${identity}&sourceType=${sourceType}&name=${name}`,
                  query: {
                    from: "h5"
                  }
                });
              }
            } else {
              Toast.success('注册成功');
              commit("setStep", "two");
            }
          } else {
            Toast(res.msg);
          }
        }
        if (data.step == 2) {
          router.push({
            path: data.page_action,
            query: {
              from: "h5"
            }
          });
        }
      } else {
        Toast(msg);
      }
    }
  }
};
