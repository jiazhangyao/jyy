import * as types from "../mutation-types";
import {
  getUser,
  faceValidate,
  faceValidateAppeal,
  getAgreement,
  getAgreementList,
  workflowFaceValidate,
  workflowFaceValidateAppeal,
  getTaskId,
  getUserByMobile,
  workflowFaceValidateAppealProcess,
  faceVerificationOfEstateProperty,
  faceVerificationOfEstatePropertyBody
} from "../../service/user";

const state = {
  accountId: "",
  taskId: "",
  user: {},
  isFetching: false,
  validateInfo: {},
  appealInfo: {},
  agreement: "",
  from: "",
  pics: {
    front: "",
    backed: "",
    hand: ""
  },
  callback:null
};
const mutations = {
  [types.CHANGE_USER_INFO](state, data) {
    state.user = data;
  },
  [types.FACE_VALIDATE](state, data) {
    state.validateInfo = data;
  },
  [types.FACE_VALIDATE_APPEAL](state, data) {
    state.appealInfo = data;
  },
  [types.CHANGE_FETCH_STATUS](state, data) {
    state.isFetching = data;
  },
  [types.SET_USER_ID](state, data) {
    state.accountId = data;
  },
  [types.SET_USER_AGREEMENT](state, data) {
    state.agreement = data;
  },
  [types.SET_TASK_ID](state, data) {
    state.taskId = data;
  },
  [types.SET_SOURCE_FROM](state, data) {
    state.from = data;
  },
  [types.SET_CALLBACK](state, data) {
    state.callback = data;
  },
};
const actions = {
  getUserInfo: async ({ commit }, { accountId }) => {
    const { success, data } = await getUser({
      accountId
    });
    if (success) {
      commit(types.CHANGE_USER_INFO, data);
      commit(types.SET_USER_ID, accountId);
    }
  },
  workFlowInfo: async ({ commit }, { mobile, type }) => {
    const { success, data } = await getUserByMobile({
      mobile,
      type
    });

    if (success) {
      commit(types.CHANGE_USER_INFO, data);
      commit(types.SET_USER_ID, data.id);
      const data2 = await getTaskId({
        mobile: data.mobile,
        type
      });
      if (data2.success) {
        return new Promise((resolve, reject) => {
          if (data2.success) {
            commit(types.SET_TASK_ID, data2.data.task_id);
            resolve(data2.data);
          } else {
            reject(data2);
          }
        });
      }
    } else {
      return new Promise((resolve, reject) => {
        reject(data);
      });
    }
  },
  getUserAgreement: async ({ commit }) => {
    const agreementList = await getAgreementList();
    if (agreementList.success) {
      const name = agreementList.data[0];
      const agreementData = await getAgreement({
        agreementName: name
      });
      if (agreementData.success) {
        commit(types.SET_USER_AGREEMENT, agreementData.data);
      }
    }
  },
  faceIdentify: async (
    { commit },
    { accountId, device, ext, identity, key, sourceType }
  ) => {
    const { success, data } = await faceValidate({
      accountId,
      device,
      ext,
      identity,
      key,
      sourceType
    });
    return new Promise((resolve, reject) => {
      if (success) {
        commit(types.FACE_VALIDATE, data);
        resolve(data);
      } else {
        reject(data);
      }
    });
  },
  faceIdentifyAppeal: async ({ commit }, { accountId, note, pics }) => {
    const { success, data, msg } = await faceValidateAppeal({
      accountId,
      note,
      pics
    });
    return new Promise((resolve, reject) => {
      if (success) {
        commit(types.FACE_VALIDATE_APPEAL, data);
        resolve(data);
      } else {
        reject(msg);
      }
    });
  },

  faceVerificationOfEstatePropertyBody: async (
    { commit },
    { data: key, personId, personName, type }
  ) => {
    const { success, data, msg } = await faceVerificationOfEstatePropertyBody({
      data: key,
      personId,
      personName,
      type
    });
    return new Promise((resolve, reject) => {
      if (success) {
        // commit(types.FACE_VALIDATE_APPEAL, data);
        resolve(data);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(msg);
        }
      }
    });
  },
  faceVerificationOfEstateProperty: async (
    { commit },
    { data: key, personId, personName, type }
  ) => {
    const { success, data, msg } = await faceVerificationOfEstateProperty({
      data: key,
      personId,
      personName,
      type
    });
    return new Promise((resolve, reject) => {
      if (success) {
        // commit(types.FACE_VALIDATE_APPEAL, data);
        resolve(data);
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(msg);
        }
      }
    });
  },
  workflowFaceIdentify: async ({ commit }, { bizData, previous, taskId }) => {
    const { success, data } = await workflowFaceValidate({
      bizData: { faceValidateForm: { ...bizData } },
      previous,
      taskId
    });
    return new Promise((resolve, reject) => {
      if (success) {
        commit(types.SET_TASK_ID, data.task_id);
        resolve(data);
      } else {
        reject(data);
      }
    });
  },
  workflowFaceIdentifyAppeal: async (
    { commit },
    { bizData, previous, taskId }
  ) => {
    const { success, data } = await workflowFaceValidateAppeal({
      bizData: { faceValidateAppealForm: { ...bizData } },
      previous,
      taskId
    });
    return new Promise((resolve, reject) => {
      if (success) {
        commit(types.SET_TASK_ID, data.task_id);
        resolve(data);
      } else {
        reject(data);
      }
    });
  }
};
export default {
  state,
  mutations,
  actions
};
