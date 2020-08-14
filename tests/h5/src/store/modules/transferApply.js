import { transferApplyInfo, contractSubmit, applicationSign } from "../../service/transfer";
import { Toast } from "vant";
import router from "../../router";
import { propertySource } from "../../utils/utils";

export default {
    namespaced: true,
    state: {
        name: 'transfer-apply',
        title: '二手房转移登记首页',
        ywInfo: [
            { name: '工单编号', value: '--' },
            { name: '申请时间', value: '--' },
        ],
        cqInfo: [
            { name: '不动产权证号', value: '--' },
            { name: '土地用途/规划用途', value: '--' },
            { name: '宗地面积/建筑面积', value: '--' },
            { name: '房屋坐落', value: '--' }
        ],
        jyInfo: [
            { name: '购房价格', value: '--' },
            { name: '缴纳税费主体', value: '--' },
            { name: '申请原因', value: '--' }
        ],
        sellerInfo: [],
        buyerInfo: [],
        askInfo: {},
        ownerData: [],//共有人
        signData: [],
        signImgs: [],
        buyerOrSeller: '',
        adjustSign: {},
        adjustSigns: {},
        contractSignForm: {},
        imgURL: '',
        cardNo: null,
        source: {},
        butShow: true,
        registerType: 5030,
    },
    mutations: {
        houseRelateChange(state, params) {
            const { orderNo, createTime, warrantNumber, planUse, space, address, housePrice, taxesPayer, propertyRightSource } = params;
            let ywInfoData = [orderNo, createTime];
            let taxesPayerText = taxesPayer === 1 ? '转让人' : (taxesPayer === 2 ? '受让人' : "申请人");
            let propertyRightSourceText = "";
            for (let i in propertySource) {
                if (propertySource[i].key == propertyRightSource) {
                    propertyRightSourceText =  propertySource[i].name
                }
            }
            state.ywInfo.map((item, index) => {
                item.value = ywInfoData[index] || '--';
            })
            let cqInfoData = [warrantNumber, planUse, space + ' 平方米', address];
            state.cqInfo.map((item, index) => {
                item.value = cqInfoData[index] || '--';
            })
            let jyInfoData = [housePrice + ' 元', taxesPayerText, propertyRightSourceText];
            state.jyInfo.map((item, index) => {
                item.value = jyInfoData[index] || '--';
            })
        },
        sellerChange(state, params) {
            state.sellerInfo = params
        },
        buyerChange(state, params) {
            state.buyerInfo = params
        },
        askChange(state, params) {
            state.askInfo = params;
        },
        signChange(state, params) {
            // 1 已签署 0 未签署
            state.signData = params;
        },
        signImg(state, params) {
            state.signImgs = params;
        },
        buyerOrSellerChange(state, params) {
            // 1 卖方 2 买方
            state.buyerOrSeller = params;
        },
        adjustSignObj(state, params) {
            state.adjustSign = params
        },
        adjustSignObjs(state, params) {
            state.adjustSigns = params
        },
        contractSignForms(state, params) {
            state.contractSignForm = params
        },
        showImg(state, params) {
            state.imgURL = params
        },
        sourceChange(state, params) {
            state.source = params;
        },
        registerTypeChange(state, params) {
            state.registerType = params;
        },
        btnShowChange(state, params) {
            state.butShow = params;
        },
        ownerDataChange(state, params) {
            state.ownerData = params;
        },
    },
    actions: {
        // contractSubmits({ commit }, params) {
        //     commit('contractSignForms', params)
        // },
        contractSubmitData({ state }) {
            contractSubmit(state.contractSignForm).then(res => {
                const { success, data, msg } = res;
                if (success) {
                    router.push({ name: 'transferSign', params: { names: 2 } })
                } else {
                    Toast(msg || res.fieldErrors[0].msg);
                }
            })
        },
        async getApplyInfo({ commit, rootState }, params) {
            const { buyerOrSeller, registerType, userFaceInfo } = rootState.transfer;
            const { cardNo } = userFaceInfo;
            const { success, data, msg, fieldErrors } = await transferApplyInfo(params);
            // 1单独所有 2共同所有 3按份额共有 4其它共有
            const ownerTypeText = {
                1: { text: '单独所有' },
                2: { text: '共同所有' },
                3: { text: '按份额共有' },
                4: { text: '其它共有' }
            }
            
            if (success) {
                const { houseRelateDTO, obligorPersonalInfo = [], obligeePersonalInfo = [], obligeeOrderAskInfoDTO, obligorOrderAskInfoDTO, signInfoDTO, obligeeOwnershipType, obligorOwnershipType } = data;
                //申请人类型: 1 义务人  2 权利人 11 义务共有人 12 权利共有人
                let sellerArrs = [];
                let buyerArrs = [];
                let labels = ['姓名', '身份证号码', '手机号码'];
                let ownerArrs = [];
                let signArrs = [];

                let arrSign = []
                let arrSignType = []
                let arrSignTypes = {};
                let butShow = true;
                for (let i in signInfoDTO) {
                    if (signInfoDTO[i].cardNo == cardNo && signInfoDTO[i].applicationSignStatus === 1) {
                        butShow = false;
                    }
                }
                // for (let i of data.obligorPersonalInfo) {
                //     if (arrSign.includes(i.name)) {
                //         arrSignType.push(i.type)
                //     }
                // }
                arrSign = data.signInfoDTO.filter(ele => {
                    return ele.applicationSignStatus === 1
                })
                const signTypeNum = rootState.transfer.signType
                for (let i of arrSign ) {
                    if (signTypeNum === i.type) {
                         arrSignType.push(i.type)
                    }
                }
                arrSignTypes = arrSignType.reduce(function (prev, next) {
                    prev[next] = (prev[next] + 1) || 1;
                    return prev;
                }, {});
                commit('adjustSignObj', arrSignTypes)

                let obligorLabels = ['姓名', '身份证号码', '占有份额', '手机号码'];
                let ownerArrsObligor = [];
                let ownerArrsObligee = [];
                //转让人 义务人
                obligorPersonalInfo.map((item, index) => {
                    if (item.type == 1) {
                        sellerArrs.push({ name: "义务人" + (index + 1) + "信息", cls: 'rentit' });
                        delete item.type;
                        item.holdShare = item.holdShare + '%';
                        let arrVal = Object.values(item);
                        obligorLabels.map((res, n) => {
                            sellerArrs.push({
                                value: arrVal[n] || '--',
                                name: res
                            })
                        })
                        ownerArrsObligor.push({ name: '义务人' + (index + 1) + '（共有人）', value: item.name })
                    }
                    if (item.type == 11) {
                        ownerArrsObligor.concat(
                            ownerArrsObligor.push(
                                { name: '其他共有人' + (index + 1) + '姓名', value: item.name }, 
                                { name: '手机号码', value: item.mobile },
                                { name: '身份证号', value: item.cardNo }
                            )
                        )
                    }
                })
                sellerArrs.push({ name: "共有方式", value: ownerTypeText[obligorOwnershipType] && ownerTypeText[obligorOwnershipType].text || '--' })
                //受让人权利人
                obligeePersonalInfo.map((item, index) => {
                    let arrVal = Object.values(item);
                    if (item.type == 2) {
                        buyerArrs.push({ name: "权利人" + (index + 1) + "信息", cls: 'rentit' })
                        delete item.type;
                        item.holdShare = item.holdShare + '%';
                        if (item.ownershipType === 3) {
                            labels = ['姓名', '身份证号码', '占有份额', '手机号码'];
                        } else {
                            labels = ['姓名', '身份证号码', '手机号码'];
                            delete item.holdShare;
                        }
                        let arrVal = Object.values(item);
                        labels.map((res, n) => {
                            buyerArrs.push({
                                value: arrVal[n] || '--',
                                name: res
                            })
                        })
                        ownerArrsObligee.push({ name: '权利人' + (index + 1) + '（共有人）', value: item.name })
                    } else if (item.type == 12) {
                        ownerArrsObligee.concat(
                            ownerArrsObligee.push(
                                { name: '其他共有人' + (index + 1) + '姓名', value: item.name }, 
                                { name: '手机号码', value: item.mobile },
                                { name: '身份证号', value: item.cardNo }
                            )
                        )
                    }
                })
                buyerArrs.push({ name: "共有方式", value: ownerTypeText[obligeeOwnershipType] && ownerTypeText[obligeeOwnershipType].text || '--' })
                signInfoDTO.map(item => {
                    signArrs.push({ name: item.name, state: item.applicationSignStatus })
                })
                let askKind = buyerOrSeller == 1 ? obligorOrderAskInfoDTO : obligeeOrderAskInfoDTO;
                if (buyerOrSeller == 1 && obligorOrderAskInfoDTO.haveJoinOwner == 1) {
                    ownerArrs = ownerArrsObligor;
                } else if (buyerOrSeller == 2 && obligeeOrderAskInfoDTO.haveJoinOwner == 1) {
                    ownerArrs = ownerArrsObligee;
                } else {
                    ownerArrs = [];
                }
                commit('houseRelateChange', houseRelateDTO)
                commit('sellerChange', sellerArrs); //义务人（卖方）信息
                commit('buyerChange', buyerArrs); //权利人（买方）信息
                commit('askChange', askKind || {});
                commit('signChange', signArrs);//签名
                commit('signImg', signInfoDTO);
                commit('buyerOrSellerChange', buyerOrSeller);
                commit('sourceChange', data);
                commit('registerTypeChange', registerType);
                commit('btnShowChange', butShow);
                commit('ownerDataChange', ownerArrs)
            } else {
                Toast(msg || fieldErrors[0].msg);
            }
        },
        async applyInfoSign({ commit, rootGetters }, params) {
            const obj = {
                ...params,
                ...rootGetters.transferParams
            }
            const { success, msg, fieldErrors } = await applicationSign(obj);
            if (success) {
                router.push("/transfer/list");
            } else {
                Toast(msg || fieldErrors[0].msg);
            }
        }
    }
}