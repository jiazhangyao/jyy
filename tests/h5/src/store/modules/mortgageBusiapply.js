import {
    detail,// 业务登记详情
} from "@/service/mortgageBusiness";
import { UserRoleEnum } from "@/views/transferbusiapply/const";
function getDefaultTransferbusiapplyForm(params) {
    return {
        "orderId": undefined, // 订单id,
        "registerType": 3010, // 登记类型（抵押首次登记：3010，抵押变更登记 3020，抵押转移登记 3030 ，抵押注销登记 3040）
        "registerPrimaryType": 3, // 登记大类: 1预告登记 2首次登记 3抵押登记 4查封登记 5转移登记 6变更登记 7更正登记 8注销登记 9异议登记 10换证和遗失补发登记
        "mortgagorInfo":{},//抵押人
        "mortgageeInfo":{},//抵押权人（仅首次、转移、变更登记
        "debtorInfo":{},
        "mortgageInfo":{},//申请内容（仅首次、转移、变更登记）
        "orderMortgageDTO":{},
        "orderReason":"",//注销说明（仅注销登记）
        "mortgagorOrderAskInfo":{},//抵押人申请信息
        "mortgageeOrderAskInfo":{},//抵押劝人申请信息
        "orderHouseList":{},//不动产信息
        "materialList": [], // 材料信息列表
        "isPost": 2, // 是否邮寄1是2否
        "orderMail":{},// 邮寄信息


        // //下面是转移登记的变量
        // "applicantType": undefined,// 申请人类型 1、个人；2、企业
        // "buyerInfo": {}, // 买方信息（权利人）
        // "buyerJoinOwner": {}, // 买方共有人列表
        // "buyerOrderAskInfo": {}, // 买方询问信息
        // "orderHouse": {},// 房产信息列表
        // "orderLand": {}, // 土地信息
        // "orderTradeInfoDTO": {}, // 订单交易信息
        // "salerInfo": null, // 卖方信息（义务人）
        // "salerJoinOwner": {}, // 卖方共有人列表
        // "salerOrderAskInfo": null, // 卖方询问信息
        // "submitType": undefined, // 1、卖方提交；2、买方提交
        // // 上面是swagger有的数据，下面是C端PC提交的多出来的数据，不确定是否有用
        // "orderNo": undefined, // 订单号
        "status": undefined, // 订单状态，流程状态
        // "writeStatus": undefined, //编辑状态，卖方填写，买方填写，都已经填写 TODO  曹克江
        // "loginUserType": undefined, // 当前登陆用户的类型 1卖方，2买方
        // "orderRejectApplocant": undefined, // 订单拒绝-描述-来自G端审核
        // "orderRejectReson4Buyer": undefined, // 订单拒绝-买方-来自G端审核
        // "orderRejectReson4Saler": undefined, // 订单拒绝-卖方-来自G端审核
        // "payUrl": undefined, // 来自后端数据
        // "confirmUrl": undefined, // 来自后端数据
        // "signUrl": undefined, // 来自后端数据
        // "appFile": null,
        // "contractFile": null,
        // "editable": undefined,
        // "familyList": [],
        // "obligorFamilyList": []
    }
}
export default {
    namespaced: true,
    state: {
        pageEditable: true, // 表明当前页是详情页还是编辑页面
        componentTitle: '',// 进入模块后的头部标题
        whichEdit: 'layout',
        materialTypeList: '', // 材料类型枚举
        transferbusiapplyForm: {}
    },
    getters: {
    },
    mutations: {
        setPageEditable(state, data) {
            state.pageEditable = data;
        },
        setMaterialTypeList(state, data) {
            state.materialTypeList = data;
        },
        setWhichEdit(state, data) {
            state.whichEdit = data;
        },
        setComponentTitle(state, data) {
            state.componentTitle = data;
        },
        setForm(state, data) {
            state.transferbusiapplyForm = {
                ...state.transferbusiapplyForm,
                ...data
            };
        },
        setInitForm(state, data) {
            state.transferbusiapplyForm = {
                ...getDefaultTransferbusiapplyForm(),
                ...data
            };
            state.whichEdit = 'layout';
        },
        setPropertyInfo(state, data) {
            function getHouseInfo() {
                return {
                    propertyPerson: cqjbxxObj.fj,
                    address: cqjbxxObj.bdczl,
                    location: cqjbxxObj.bdczl,
                    buildYear: cqjbxxObj.jznd,
                    houseStructure: Number(cqjbxxObj.fwjg) || cqjbxxObj.fwjg,
                    inFloor: cqjbxxObj.lc,
                    planUse: cqjbxxObj.fwyt,
                    regionId: 100,
                    space: cqjbxxObj.jzmj,
                    totalFloor: cqjbxxObj.zlc,
                    unitNumber: cqjbxxObj.bdcdyh,
                    warrantNumber: cqjbxxObj.bdcqzh || qsxxObj.bdcqzh,
                    southWall: cqjbxxObj.nq,
                    westernWall: cqjbxxObj.xq,
                    northWall: cqjbxxObj.bq,
                    eastWall: cqjbxxObj.dq,
                    completedDate: cqjbxxObj.jgrq,
                    certificateType: warrantType,     //需要特殊处理
                    natureHouse: cqjbxxObj.fwxz,
                    landUsage: cqjbxxObj.tdyt,
                    houseType: cqjbxxObj.fwlx,
                    projectName: '',
                    propertyCategory: cqjbxxObj.cqlb,
                    ownershipType: qsxxObj.gyfs || 1,
                    isLost: 2,
                };
            }

            const { warrantType, cqjbxxObj = {}, qsxxObj = {}, syqrxxList } = data;
            let propertyPerson = []; // 产权人，一手房直接取用，二手房和土地需要拼接
            let obj = {}; // 最终处理的数据，与后端交互

            //义务人/卖方/转让方
            obj.mortgagorInfo = {
                applicantList: [],
            };

            if (syqrxxList) {
                obj.mortgagorInfo.applicantList = syqrxxList.map((item, index) => {
                    propertyPerson.push(item.syqrxm);
                    let applicant = {
                        typeDesc: `义务人${index + 1}`,
                        name: item.syqrxm,
                        cardType: Number(item.zjlx) ? Number(item.zjlx) : item.zjlx,
                        cardNo: item.zjhm,
                        mobile: item.lxdh || '',
                        orgType: item.qllx ? +item.qllx : data.orgType,
                        smsStatus: 0,
                        credooIdentity: 1,
                        isStarter: 1,
                        rightProportion: item.zyfe,
                        proxyList: [],
                        faceIdentity: 1,
                        holdingType: 2,
                        isHolder: 1,
                        isTaxesPayer: 1,
                        type: 1
                    };
                    return applicant;
                });
            } else {
                obj.mortgagorInfo = [];
            }


            obj.orderHouse = { ...getHouseInfo(),propertyPerson: propertyPerson.join(','), name: propertyPerson.join(',') };


            state.whichEdit = 'layout';
            state.transferbusiapplyForm = {
                ...getDefaultTransferbusiapplyForm(),
                ...obj,
                orderTradeInfoDTO: {
                    taxesPayer: data.registerType == 5020 ? UserRoleEnum.getValueFromAlias('ROLE_APPLICANT') : UserRoleEnum.getValueFromAlias('ROLE_ASSIGNOR')
                },
                location:  obj.orderHouse.location,
                registerType: data.registerType,
                "registerPrimaryType": 3, // 转移登记大类，写死50
            };
        },
        setValue(state) {
            state.whichEdit = 'layout';
            state.transferbusiapplyForm = {
                ...getDefaultTransferbusiapplyForm(),
                ...state.transferbusiapplyForm
            };
        },
    },
    actions: {
        getData: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                detail(data).then(res => {
                    if (res.success) {
                        let data = res.data;
                        res.data.location = data.orderHouse.location;
                        commit("setInitForm", {
                            ...res.data
                        })
                        resolve(res);
                    } else {
                        reject(res)
                    }
                })
            })
        }
    },
    modules: {}
}