/*
 * @Author: tim huang
 * @Date: 2019-03-20 16:35:19
 * @Last Modified by: tim huang
 * @Last Modified time: 2019-03-20 16:36:16
 */

import * as types from "../mutation-types";
import { getMonthlies, getOneMonthly, getOneArticle } from "../../service/demo";
// initial state
const state = {
  describle: "hello world, I am tim, from shanghai",
  // 所有月刊
  monthlies: [],
  // 当前月刊
  currMonthly: {},
  // 政策类 文章
  policyArticle: {},
  // 普通类的文章
  normalArticle: {}
};

// getters
const getters = {
  extraDescrible: state => `${state.describle} china!`
};

// actions
const actions = {
  getMonthlies: async ({ commit }) => {
    const { success, data } = await getMonthlies();
    if (success) {
      commit(types.DEMO_GET_MONTHLIES, data);
    }
  },
  getOneMonthly: async ({ commit }, mId) => {
    const { success, data } = await getOneMonthly(mId);
    if (success) {
      commit(types.DEMO_GET_ONE_MONTHLY, data);
    }
  },
  getPolicyArticle: async ({ commit }, { monthlyId, articleId }) => {
    const { success, data } = await getOneArticle({
      monthlyId,
      articleId,
      articleType: 1
    });
    if (success) {
      commit(types.DEMO_GET_POLICY_ARTICLE, data);
    }
  },
  getNormalArticle: async ({ commit }, { monthlyId, articleId }) => {
    const { success, data } = await getOneArticle({
      monthlyId,
      articleId,
      articleType: 2
    });
    if (success) {
      commit(types.DEMO_GET_NORMAL_ARTICLE, data);
    }
  }
};

// mutations
const mutations = {
  [types.DEMO_GET_MONTHLIES](state, data) {
    state.monthlies = data;
  },
  [types.DEMO_GET_ONE_MONTHLY](state, data) {
    state.currMonthly = data;
  },
  [types.DEMO_GET_POLICY_ARTICLE](state, data) {
    state.policyArticle = data;
  },
  [types.DEMO_GET_NORMAL_ARTICLE](state, data) {
    state.normalArticle = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
