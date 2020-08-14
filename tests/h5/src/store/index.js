/*
 * Created by Alex Zhang on 2019/3/19
 */
import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./getters";
import base from "./modules/base";
import login from "./modules/login";
import register from "./modules/register";
import certification from "./modules/certification";
import forget from "./modules/forget";
import account from "./modules/account";
import transfer from "./modules/transfer";
import applyinfo from "./modules/transferApply";
import transferEstateSearch from "./modules/transferEstateSearch"
import transferbusiapply from "./modules/transferbusiapply"
import approve from "./modules/approve"
import pretaxinfo from "./modules/transferPretax";
import taxesinfo from "./modules/transferTaxes"
import sealUp from "./modules/sealUp"
import mortgageEstateSearch from "./modules/mortgageEstateSearch"
import mortgageBusiapply from "./modules/mortgageBusiapply"
import mortgageTaxes from "./modules/mortgageTaxes";
import mortgage from "./modules/mortgage";
import mortgageApply from "./modules/mortgageApply";
import mortgagePretax from "./modules/mortgagePretax";
//import demo from "./modules/demo";

import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  // key: 'hgVuexLocal',
  // storage: window.localStorage,
  // modules: ['sealUp']
})

export const vuexSession = new VuexPersistence({
  key: 'hgVuexSession',
  storage: window.sessionStorage,
  reducer: (state) => ({
    transfer: state.transfer,
    sealUp: state.sealUp,
    transferbusiapply: state.transferbusiapply,
    mortgageBusiapply: state.mortgageBusiapply,
    account: state.account
  })
})

// console.log('before', vuexSession.storage.hgVuexSession)

// vuexSession.storage = {}

// console.log('after', vuexSession.storage)

export default new Vuex.Store({
  getters,
  modules: {
    base,
    register,
    login,
    certification,
    forget,
    account,
    transfer,
    applyinfo,
    pretaxinfo,
    transferEstateSearch,
    transferbusiapply,
    approve,
    taxesinfo,
    sealUp,
    mortgageEstateSearch,
    mortgageBusiapply,
    mortgageTaxes,
    mortgageApply,
    mortgagePretax,
    mortgage,
  },
  plugins: [vuexSession.plugin],
  strict: true
});
