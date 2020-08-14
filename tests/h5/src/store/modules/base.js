/*
* Created by Alex Zhang on 2019/3/19
*/
import * as types from '../mutation-types'
import { GetDict, GetMenu, Ticket, BaseInfo, GetFileHost, BusinessBaseInfo } from "../../service/common";
import { toBase64 } from "../../utils/utils.js";
import router from "../../router";

const state = {
    title: '',   ///头部的title；
    dict: '',
    fileHost: '',
    baseinfo: {},
    params: {},
    menu: {},
    userBaseInfo: {}
}
const mutations = {

    [types.SET_TITLE](state, data) {
        // window.document.title = data;
        state.title = data;
    },
    [types.SET_DICT](state, data) {
        state.dict = data;
    },
    [types.SET_PARAM](state, data) {

        state.params = data;
    },
    [types.MENU](state, data) {
        state.menu = data;
    },
    [types.BASEINFO](state, data) {
        state.baseinfo = data;
    },
    [types.FILEHOST](state, data) {
        state.fileHost = data;
    },
    setUserBaseInfo(state, data) {
        state.userBaseInfo = data;
    }
}
const actions = {
    login: async ({ commit, rootState }) => {

        const ticket = await Ticket();
        if (ticket.success) {
            const userType = window.localStorage.getItem('userType');
            // 0-企业  1-个人
            const requestFunc = userType == 1 ? BaseInfo : BusinessBaseInfo;
            const baseinfo = await requestFunc({ PackToken: ticket.data });
            if (baseinfo.success) {
              const userTotalInfo = {
                fullName: baseinfo.data.accountInfo.fullName,
                name: baseinfo.data.accountInfo.name,
                companyId: baseinfo.data.companyId,
                isBManager: baseinfo.data.isBManager,
                isShowOrgMangerMenu: baseinfo.data.isShowOrgMangerMenu,
                sourceType: baseinfo.data.sourceType
              }
              commit('account/setUserTotalInfo', userTotalInfo);
              commit('setUserBaseInfo', baseinfo.data.accountInfo);
            }
            let orderIdNum = localStorage.getItem('orderIds')
            if (orderIdNum) {
                // let orderIds  = router.history.current.query.orderId || window.location.href.split('?')[1].split('=')[1].split('#')[0] 
                const params = {
                    orderId: orderIdNum,
                    name: toBase64(baseinfo.data.accountInfo.fullName),
                    cardNo: toBase64(baseinfo.data.accountInfo.identity)
                }
                commit('transfer/changeSessionParams', params, { root: true });
                const userInfo = {
                    userId: baseinfo.data.userId,
                    cardNo: baseinfo.data.accountInfo.identity,
                    sourceTypeNum: baseinfo.data.sourceType,
                    fullName: baseinfo.data.accountInfo.fullName,
                    name: baseinfo.data.accountInfo.name,
                    companyId: baseinfo.data.companyId,
                    isBManager: baseinfo.data.isBManager
                }
                commit('transfer/getUserInfo', userInfo, { root: true })
                //sessionStorage.setItem('transferToken', JSON.stringify(params))
                commit(types.BASEINFO, baseinfo.data);
                return baseinfo
            } else {
                commit(types.BASEINFO, {});
            }
            return baseinfo
        }
        
    },
    dict: async ({ commit }) => {
        const arr = [];
        const { success, data } = await GetDict({});
        if (success) {
            let robotApiUrl = data.domainIntelligentCustomerService;
            Object.keys(data).map(item => {
                const arr_inner = []
                data[item] && Object.keys(data[item]).map(inner => {
                    arr_inner.push({
                        key: inner,
                        name: data[item][inner]
                    })
                })
                arr[item] = arr_inner;
            })
            commit(types.SET_DICT, {
                ...arr,
                planUse: data.planUse,
                robotApiUrl
            });
            new Promise((resolve, reject) => {
                resolve()
            })
        }
    },
    menu: async ({ commit }) => {

    },
    getFileHost: async ({ commit }) => {
        const { success, data } = await GetFileHost();
        if (success) {
            commit(types.FILEHOST, data);
            new Promise((resolve, reject) => {
                resolve()
            })
        }
    },
}
export default {
    state,
    mutations,
    actions
}
